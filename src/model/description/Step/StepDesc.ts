import { StateDesc } from '../State/StateDesc';
import { ActionDesc } from './ActionDesc';
import { OutcomeDesc } from './OutcomeDesc';
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
