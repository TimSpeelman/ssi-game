import { ValidationResultDesc } from '../view/ValidationResultDesc';
import { ScenarioState } from './ScenarioState';

export interface IValidationResult {
    /** Give a generic description of this validation result for viewing purposes */
    describe(state: ScenarioState): ValidationResultDesc;
}