import { Translation } from '../../../../intl/Language';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { Field } from '../View/Field';

/**
 * A generic way of describing properties of content types like assets and actions.
 */
export interface IContentTypeProp<DefType, EvaluatedType> {
    readonly key: string;

    readonly title: Translation;

    /** The default value of this property */
    getDefaultValue(): DefType;

    /** Computes the field properties to display in the creation or edit form */
    getFormFieldProps(formData: any, state: ScenarioState): Field;

    /** Parse the user's input */
    parseUserInput(formData: any, state: ScenarioState): DefType;

    /** Evaluate the property against the current scenario state */
    evaluateDefinitionProp(defProps: any, state: ScenarioState): EvaluatedType | undefined;
}

export type DefTypeOfProp<T extends IContentTypeProp<any, any>> = T extends IContentTypeProp<infer U, any> ? U : never;

export type EvaluatedTypeOfProp<T extends IContentTypeProp<any, any>> = T extends IContentTypeProp<any, infer U>
    ? U
    : never;
