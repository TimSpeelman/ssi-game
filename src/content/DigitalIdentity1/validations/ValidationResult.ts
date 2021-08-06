import { Translation } from '../../../intl/Language';
import { ValidationResultDesc } from '../../../model/description/Step/ValidationResultDesc';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';

export class ValidationResult implements IValidationResult {
    constructor(readonly success: boolean, readonly message: Translation) {}

    describe(): ValidationResultDesc {
        return {
            message: this.message,
            success: this.success,
        };
    }
}
