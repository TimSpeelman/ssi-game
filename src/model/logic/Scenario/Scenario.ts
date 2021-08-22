import { ContentLibrary } from '../../content/ContentLibrarty';
import { ScenarioDef } from '../../definition/Scenario/ScenarioDef';
import { ScenarioDesc } from '../../description/Scenario/ScenarioDesc';
import { ScenarioState } from '../State/ScenarioState';
import { Action } from '../Step/Action';
import { ComputedStep } from '../Step/ComputedStep';

export class Scenario {
    readonly steps: ComputedStep[];
    readonly initial: ScenarioState;

    constructor(readonly definition: ScenarioDef, readonly contentLibrary: ContentLibrary) {
        const steps = definition.steps.map((s) => contentLibrary.actions.deserialize(s));
        this.initial = ScenarioState.fromConfig(definition, contentLibrary);
        let state = this.initial.withUpdate((s) => ({ ...s, isInitial: false }));

        // Cache the outcome and result computation.
        this.steps = steps.map((step, index) => {
            const computedStep = step.computeStep(state, index);
            state = computedStep.postState;
            return computedStep;
        });
    }

    /** Providing the preState of a step at provided index, or the last post state */
    getPreStateAtIndex(index: number) {
        if (index === -1 || this.steps.length === 0) {
            return this.initial;
        } else if (index < this.steps.length) {
            return this.steps[index].preState;
        } else if (index === this.steps.length) {
            return this.steps[this.steps.length - 1].postState;
        } else {
            throw new Error('Provided state index ' + index + ' out of bounds');
        }
    }

    describe(): ScenarioDesc {
        return {
            initial: this.initial.describe(),
            definition: this.definition,
            steps: this.steps.map((s) => s.describe()),
            failingAtIndex: this.steps.findIndex((s) => !s.succeeds),
        };
    }
}

export interface ScenarioProps {
    config: ScenarioDef;
    steps: Action<any>[];
}
