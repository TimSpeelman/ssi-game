import { deserialize as deserializeAction } from '../../../content/actions/actions';
import { ScenarioDef } from '../../definition/ScenarioDef';
import { ScenarioDescription } from '../../view/ScenarioDescription';
import { Action } from '../Action/Action';
import { ComputedStep } from '../Action/ComputedStep';
import { ScenarioState } from '../State/ScenarioState';

export class Scenario {
    readonly steps: ComputedStep[];
    readonly initial: ScenarioState;

    constructor(readonly props: ScenarioDef) {
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
}

export interface ScenarioProps {
    config: ScenarioDef;
    steps: Action<any>[];
}
