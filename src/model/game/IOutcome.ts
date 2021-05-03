import { ScenarioStateDescription } from '../view/ScenarioStateDescription';

/** An Outcome describes any change in state resulting from an action */
export interface IOutcome {
    /** Compute the new state based on this outcome */
    computeState(state: ScenarioStateDescription): ScenarioStateDescription;

    /** Give a generic description of this outcome for viewing purposes */
    describe(state: ScenarioStateDescription): string;
}
