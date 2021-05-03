import { IValidationResult } from '../../model/game/IValidationResult';
import { ValidationResultDesc } from '../../model/view/ValidationResultDesc';

export class ValidationResult implements IValidationResult {
    constructor(readonly success: boolean, readonly message: string) {}

    describe(): ValidationResultDesc {
        return {
            message: this.message,
            success: this.success,
        };
    }
}
