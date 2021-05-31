import { deserialize as deserializeAction } from '../../content/actions/actions';
import { ActorState } from '../view/ActorState';
import { ScenarioDescription } from '../view/ScenarioDescription';
import { Action, SerializedAction } from './Action';
import { ComputedStep } from './ComputedStep';
import { ScenarioState, SerializedScenarioState } from './ScenarioState';

export class Scenario {
    readonly steps: ComputedStep[];

    static deserialize(s: SerializedScenario) {
        const props = {
            initial: ScenarioState.deserialize(s.props.initial),
            meta: s.props.meta,
            steps: s.props.steps.map((s) => deserializeAction(s)),
        };
        return new Scenario(props);
    }

    constructor(readonly props: ScenarioProps) {
        let state: ScenarioState = props.initial;

        // Cache the outcome and result computation.
        this.steps = props.steps.map((step) => {
            const computedStep = step.computeStep(state);
            state = computedStep.props.postState;
            return computedStep;
        });
    }

    describe(): ScenarioDescription {
        return {
            initial: this.props.initial.describe(),
            meta: this.props.meta,
            steps: this.steps.map((s) => s.describe()),
            failingAtIndex: this.steps.findIndex((s) => !s.hasSucceeded()),
        };
    }

    serialize(): SerializedScenario {
        return {
            props: {
                initial: this.props.initial.describe(),
                meta: this.props.meta,
                steps: this.props.steps.map((s) => s.serialize()),
            },
        };
    }
}

export interface ScenarioProps {
    initial: ScenarioState;
    meta: ScenarioMeta;
    steps: Action[];
}

export interface ScenarioMeta {
    title: string;
    author: string;
    body: string;
}

export interface ScenarioConfig {
    meta: ScenarioMeta;
    actors: ActorState[];
}

export interface SerializedScenario {
    props: SerializedScenarioProps;
}

export interface SerializedScenarioProps {
    initial: SerializedScenarioState;
    meta: ScenarioMeta;
    steps: SerializedAction[];
}
