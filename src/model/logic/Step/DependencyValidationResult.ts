import { Translation } from '../../../intl/Language';
import { ValidationResultDesc } from '../../description/Step/ValidationResultDesc';
import { ScenarioState } from '../State/ScenarioState';
import { IValidationResult } from './IValidationResult';

export class DependencyValidationResult implements IValidationResult {
    success = false;

    constructor(readonly msg: Translation) {}

    /** Give a generic description of this validation result for viewing purposes */
    describe(state: ScenarioState): ValidationResultDesc {
        return {
            message: this.msg,
            success: false,
        };
    }
}
