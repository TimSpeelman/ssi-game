import { Translation } from '../../../../intl/Language';
import { ScenarioState } from '../../../logic/State/ScenarioState';

/**
 * A generic way of describing properties of content types like assets and actions.
 */
export interface IPropHandler<DefType, EvaluatedType, FieldType> {
    readonly title: Translation;

    /** The default value of this property */
    getDefaultValue(): DefType;

    /** Computes the field properties to display in the creation or edit form */
    getFormFieldProps(key: string, formData: any, state: ScenarioState): FieldType;

    /** Parse the user's input */
    parseUserInput(key: string, formData: any, state: ScenarioState): DefType;

    /** Evaluate the property against the current scenario state */
    evaluateDefinitionProp(key: string, defProps: any, state: ScenarioState): EvaluatedType | undefined;

    /** Validate whether the prop requirements are satisfied */
    validateDefinitionProp(key: string, defProps: any, state: ScenarioState): Translation | undefined;
}
