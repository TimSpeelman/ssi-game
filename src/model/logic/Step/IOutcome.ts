import { Translation } from '../../../intl/Language';
import { ScenarioState } from '../State/ScenarioState';

/** An Outcome describes any change in state resulting from an action */
export interface IOutcome {
    /** Compute the new state based on this outcome */
    computeState(state: ScenarioState): ScenarioState;

    /** Give a generic description of this outcome for viewing purposes */
    describe(state: ScenarioState): Translation;
}
