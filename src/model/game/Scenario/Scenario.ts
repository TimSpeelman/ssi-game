import { deserialize as deserializeAction } from '../../../content/actions/actions';
import { ScenarioConfig } from '../../setup/ScenarioConfig';
import { ScenarioDescription } from '../../view/ScenarioDescription';
import { Action } from '../Action/Action';
import { ComputedStep } from '../Action/ComputedStep';
import { ScenarioState } from '../State/ScenarioState';
import { PlainScenario } from './PlainScenario';

export class Scenario {
    readonly steps: ComputedStep[];
    readonly initial: ScenarioState;

    static deserialize(s: PlainScenario) {
        const props = s.props;
        return new Scenario(props);
    }

    constructor(readonly props: ScenarioConfig) {
        const steps = props.steps.map((s) => deserializeAction(s));
        this.initial = ScenarioState.fromConfig(props);
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
            meta: this.props.meta,
            steps: this.steps.map((s) => s.describe()),
            failingAtIndex: this.steps.findIndex((s) => !s.hasSucceeded()),
        };
    }

    serialize(): PlainScenario {
        return {
            props: this.props,
        };
    }
}

export interface ScenarioProps {
    config: ScenarioConfig;
    steps: Action<any>[];
}
