import { ValidationResultDesc } from '../../model/description/ValidationResultDesc';
import { IValidationResult } from '../../model/game/Action/IValidationResult';

export class ValidationResult implements IValidationResult {
    constructor(readonly success: boolean, readonly message: string) {}

    describe(): ValidationResultDesc {
        return {
            message: this.message,
            success: this.success,
        };
    }
}
