import { deserialize as deserializeAction } from '../action/actions';
import { IAction, SerializedAction } from '../action/IAction';
import { InteractionDescription } from '../action/InteractionDescription';
import { Actor } from '../actor/Actor';
import { Asset } from '../asset/Asset';
import { IOutcome } from '../outcome/IOutcome';

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
    steps: IAction[];
}

/** A Scenario is described as a set of steps starting from an initial state */
export interface ScenarioDescription {
    initial: ScenarioStateDescription;
    steps: ScenarioStepDescription[];
}

/** A ScenarioStep is an Action which has some Outcomes and produces a new ScenarioState */
export interface ScenarioStepDescription {
    action: InteractionDescription;
    outcomes: OutcomeDescription[];
    result: ScenarioStateDescription;
}

/** A ScenarioState is a snapshot of all Actors and their Assets at a moment in time */
export interface ScenarioStateDescription {
    actors: Record<
        string,
        {
            assets: Asset[];
            actor: Actor;
            mode?: string;
        }
    >;
}

export type OutcomeDescription = string;

export interface SerializedScenario {
    props: SerializedScenarioProps;
}

export interface SerializedScenarioProps {
    initial: ScenarioStateDescription;
    steps: SerializedAction[];
}
