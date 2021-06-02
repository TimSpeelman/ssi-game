import { ValidationResultDesc } from '../../description/ValidationResultDesc';
import { ScenarioState } from '../State/ScenarioState';

export interface IValidationResult {
    success: boolean;

    /** Give a generic description of this validation result for viewing purposes */
    describe(state: ScenarioState): ValidationResultDesc;
}
