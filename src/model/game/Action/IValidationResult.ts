import { ValidationResultDesc } from '../../view/ValidationResultDesc';
import { ScenarioState } from '../Scenario/ScenarioState';

export interface IValidationResult {
    success: boolean;

    /** Give a generic description of this validation result for viewing purposes */
    describe(state: ScenarioState): ValidationResultDesc;
}
