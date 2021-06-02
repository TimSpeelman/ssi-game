import { ActionDesc } from './ActionDesc';
import { OutcomeDesc } from './OutcomeDesc';
import { StateDesc } from './StateDesc';
import { ValidationResultDesc } from './ValidationResultDesc';

/** Describes a computed step */
export interface StepDesc {
    success: boolean;
    active: boolean;
    action: ActionDesc;
    validation: ValidationResultDesc[];
    outcomes: OutcomeDesc[];
    result: StateDesc;
}
