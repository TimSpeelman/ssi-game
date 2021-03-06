import { Translation } from '../../../../intl/Language';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { Field } from '../View/Field';

/**
 * A generic way of describing properties of content types like assets and actions.
 */
export interface IContentTypeProp<DefType, EvaluatedType> {
    readonly title: Translation;

    /** The default value of this property */
    getDefaultValue(): DefType;

    /** Computes the field properties to display in the creation or edit form */
    getFormFieldProps(key: string, formData: any, state: ScenarioState): Field;

    /** Parse the user's input */
    parseUserInput(key: string, formData: any, state: ScenarioState): DefType;

    /** Evaluate the property against the current scenario state */
    evaluateDefinitionProp(key: string, defProps: any, state: ScenarioState): EvaluatedType | undefined;

    /** Validate whether the prop requirements are satisfied */
    validateDefinitionProp(key: string, defProps: any, state: ScenarioState): Translation | undefined;
}

export type DefTypeOfProp<T extends IContentTypeProp<any, any>> = T extends IContentTypeProp<infer U, any> ? U : never;

export type EvaluatedTypeOfProp<T extends IContentTypeProp<any, any>> = T extends IContentTypeProp<any, infer U>
    ? U
    : never;
