import { deserialize as deserializeAction } from '../../../content/actions/actions';
import { ScenarioDef } from '../../definition/ScenarioDef';
import { ScenarioDesc } from '../../description/ScenarioDesc';
import { Action } from '../Action/Action';
import { ComputedStep } from '../Action/ComputedStep';
import { ScenarioState } from '../State/ScenarioState';

export class Scenario {
    readonly steps: ComputedStep[];
    readonly initial: ScenarioState;

    constructor(readonly definition: ScenarioDef) {
        const steps = definition.steps.map((s) => deserializeAction(s));
        this.initial = ScenarioState.fromConfig(definition);
        let state = this.initial;

        // Cache the outcome and result computation.
        this.steps = steps.map((step) => {
            const computedStep = step.computeStep(state);
            state = computedStep.props.postState;
            return computedStep;
        });
    }

    describe(): ScenarioDesc {
        return {
            initial: this.initial.describe(),
            definition: this.definition,
            steps: this.steps.map((s) => s.describe()),
            failingAtIndex: this.steps.findIndex((s) => !s.hasSucceeded()),
        };
    }
}

export interface ScenarioProps {
    config: ScenarioDef;
    steps: Action<any>[];
}
