import { IOutcome } from '../outcome/IOutcome';
import { ScenarioStateDescription } from '../scenario/Scenario';
import { InteractionDescription } from './InteractionDescription';

/**
 * The player programs Actions. The action type defines what preconditions must be met before this action can occur and
 * computes the results of the action, which results in a new state.
 */
export interface IAction {
    id: string;

    /** Given a scenario state, check if the preconditions are met to perform this action */
    validatePreConditions(state: ScenarioStateDescription): string[];

    /** Given a scenario state, compute the outcomes of this action */
    computeOutcomes(state: ScenarioStateDescription): IOutcome[];

    /** Provide a generic description of this action for viewing purposes */
    describe(state: ScenarioStateDescription): InteractionDescription;
}
