import { deserialize as deserializeAction } from '../../content/actions/actions';
import { Asset } from '../../content/assets/Asset';
import { ScenarioDescription } from '../view/ScenarioDescription';
import { ComputedStep } from './Action/ComputedStep';
import { PlainAction } from './Action/PlainAction';
import { ActorDefinition } from './Actor/ActorDefinition';
import { ScenarioState } from './ScenarioState';

export class Scenario {
    readonly steps: ComputedStep[];
    readonly initial: ScenarioState;

    static deserialize(s: SerializedScenario) {
        const props = {
            config: s.props.config,
            steps: s.props.steps,
        };
        return new Scenario(props);
    }

    constructor(readonly props: ScenarioProps) {
        const steps = props.steps.map((s) => deserializeAction(s));
        this.initial = ScenarioState.fromConfig(props.config);
        let state = this.initial;

        // Cache the outcome and result computation.
        this.steps = steps.map((step) => {
            const computedStep = step.computeStep(state);
            state = computedStep.props.postState;
            return computedStep;
        });
    }

    describe(): ScenarioDescription {
        return {
            initial: this.initial.describe(),
            meta: this.props.config.meta,
            steps: this.steps.map((s) => s.describe()),
            failingAtIndex: this.steps.findIndex((s) => !s.hasSucceeded()),
        };
    }

    serialize(): SerializedScenario {
        return {
            props: {
                config: this.props.config,
                steps: this.props.steps,
            },
        };
    }
}

export interface ScenarioProps {
    config: ScenarioConfig;
    steps: PlainAction<any>[];
}

export interface ScenarioMeta {
    title: string;
    author: string;
    body: string;
}

export interface ScenarioConfig {
    meta: ScenarioMeta;
    actors: ActorConfig[];
}

export interface ActorConfig {
    definition: ActorDefinition;
    initialAssets: Asset[];
}

export interface SerializedScenario {
    props: SerializedScenarioProps;
}

export interface SerializedScenarioProps {
    config: ScenarioConfig;
    steps: PlainAction[];
}
