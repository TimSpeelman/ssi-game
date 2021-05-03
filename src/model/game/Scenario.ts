import { deserialize as deserializeAction } from '../../content/actions/actions';
import { ScenarioDescription } from '../view/ScenarioDescription';
import { Action, SerializedAction } from './Action';
import { ComputedStep } from './ComputedStep';
import { ScenarioState, SerializedScenarioState } from './ScenarioState';

export class Scenario {
    readonly steps: ComputedStep[];

    static deserialize(s: SerializedScenario) {
        const props = {
            initial: ScenarioState.deserialize(s.props.initial),
            steps: s.props.steps.map((s) => deserializeAction(s)),
        };
        return new Scenario(props);
    }

    constructor(readonly props: ScenarioProps) {
        let state: ScenarioState = props.initial;

        // Cache the outcome and result computation.
        this.steps = props.steps.map((step) => {
            const preState = state;
            const outcomes = step.computeOutcomes(state);
            const validation = step.validatePreConditions(state);

            const postState = outcomes.reduce((result, outcome) => outcome.computeState(result), preState);
            state = postState;
            return new ComputedStep({
                action: step,
                outcomes,
                validation,
                preState,
                postState,
            });
        });
    }

    describe(): ScenarioDescription {
        return {
            initial: this.props.initial.describe(),
            steps: this.steps.map((s) => s.describe()),
        };
    }

    serialize(): SerializedScenario {
        return {
            props: {
                initial: this.props.initial.describe(),
                steps: this.props.steps.map((s) => s.serialize()),
            },
        };
    }
}

export interface ScenarioProps {
    initial: ScenarioState;
    steps: Action[];
}

export interface SerializedScenario {
    props: SerializedScenarioProps;
}

export interface SerializedScenarioProps {
    initial: SerializedScenarioState;
    steps: SerializedAction[];
}
