import { deserialize as deserializeAction } from '../../content/actions/actions';
import { InteractionDescription } from '../../content/actions/InteractionDescription';
import { ScenarioDescription } from '../view/ScenarioDescription';
import { ScenarioStateDescription } from '../view/ScenarioStateDescription';
import { ScenarioStepDescription } from '../view/ScenarioStepDescription';
import { Action, SerializedAction } from './Action';
import { IOutcome } from './IOutcome';

export class Scenario {
    readonly steps: Array<{
        description: InteractionDescription;
        outcomes: IOutcome[];
        stateBefore: ScenarioStateDescription;
        stateAfter: ScenarioStateDescription;
    }>;

    static deserialize(s: SerializedScenario) {
        const props = {
            ...s.props,
            steps: s.props.steps.map((s) => deserializeAction(s)),
        };
        return new Scenario(props);
    }

    constructor(readonly props: ScenarioProps) {
        let state: ScenarioStateDescription = props.initial;

        // Cache the outcome and result computation.
        this.steps = props.steps.map((step) => {
            const stateBefore = state;
            const outcomes = step.computeOutcomes(state);
            const stateAfter = outcomes.reduce((result, outcome) => outcome.computeState(result), stateBefore);
            state = stateAfter;
            return {
                description: step.describe(state),
                outcomes,
                stateBefore,
                stateAfter,
            };
        });
    }

    describe(): ScenarioDescription {
        return {
            initial: this.props.initial,
            steps: this.steps.map(
                (step): ScenarioStepDescription => ({
                    action: step.description,
                    outcomes: step.outcomes.map((o) => o.describe(step.stateBefore)),
                    result: step.stateAfter,
                }),
            ),
        };
    }

    serialize(): SerializedScenario {
        return {
            props: {
                ...this.props,
                steps: this.props.steps.map((s) => s.serialize()),
            },
        };
    }
}

export interface ScenarioProps {
    initial: ScenarioStateDescription;
    steps: Action[];
}

export interface SerializedScenario {
    props: SerializedScenarioProps;
}

export interface SerializedScenarioProps {
    initial: ScenarioStateDescription;
    steps: SerializedAction[];
}
