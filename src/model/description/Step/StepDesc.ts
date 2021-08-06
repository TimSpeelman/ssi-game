import { StateDesc } from '../State/StateDesc';
import { ActionDesc } from './ActionDesc';
import { OutcomeDesc } from './OutcomeDesc';
import { ValidationResultDesc } from './ValidationResultDesc';

/** Describes a computed step */
export interface StepDesc {
    /** Indicates whether the step was successful */
    success: boolean;

    /** Indicates whether the step was active. Only if this and previous steps were all successful */
    active: boolean;

    /** The action descriptor */
    action: ActionDesc;

    /** The validation results from this action */
    validation: ValidationResultDesc[];

    /** The outcomes from this action */
    outcomes: OutcomeDesc[];

    /** The state that results from this action */
    result: StateDesc;
}
