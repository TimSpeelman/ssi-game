import { DefaultActionsCollection } from '../../../content/actions/actions';
import { ScenarioDef } from '../../definition/ScenarioDef';
import { ScenarioDesc } from '../../description/Scenario/ScenarioDesc';
import { ScenarioState } from '../State/ScenarioState';
import { Action } from '../Step/Action';
import { ComputedStep } from '../Step/ComputedStep';

export class Scenario {
    readonly steps: ComputedStep[];
    readonly initial: ScenarioState;

    constructor(readonly definition: ScenarioDef) {
        const steps = definition.steps.map((s) => DefaultActionsCollection.deserialize(s));
        this.initial = ScenarioState.fromConfig(definition);
        let state = this.initial.withUpdate((s) => ({ ...s, isInitial: false }));

        // Cache the outcome and result computation.
        this.steps = steps.map((step, i) => {
            const computedStep = step.computeStep(state);
            state = computedStep.props.postState;
            return computedStep;
        });
    }

    /** Providing the preState of a step at provided index, or the last post state */
    getPreStateAtIndex(index: number) {
        if (index === 0) {
            return this.initial;
        } else if (index < this.steps.length) {
            return this.steps[index].props.preState;
        } else if (index === this.steps.length) {
            return this.steps[this.steps.length - 1].props.postState;
        } else {
            throw new Error('Provided state index ' + index + ' out of bounds');
        }
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
