import { ValidationResultDesc } from '../../model/description/Step/ValidationResultDesc';
import { IValidationResult } from '../../model/game/Step/IValidationResult';

export class ValidationResult implements IValidationResult {
    constructor(readonly success: boolean, readonly message: string) {}

    describe(): ValidationResultDesc {
        return {
            message: this.message,
            success: this.success,
        };
    }
}
