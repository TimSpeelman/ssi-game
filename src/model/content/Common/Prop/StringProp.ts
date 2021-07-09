import { Translation } from '../../../../intl/Language';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { Field } from '../View/Field';
import { IContentTypeProp } from './IContentTypeProp';

export interface StringPropOptions {
    title: Translation;
}

export class StringProp<FormData> implements IContentTypeProp<string, string> {
    constructor(readonly key: keyof FormData, readonly options: StringPropOptions) {}

    /** Computes the default value. */
    getDefaultValue() {
        return '';
    }

    /** Computes the field properties to display in the creation or edit form. */
    getFormFieldProps(formData: FormData, state: ScenarioState): Field {
        return {
            type: 'string',
            title: this.options.title,
            // @ts-ignore
            value: formData[this.key],
        }; // TODO
    }

    /** Parses the prop */
    parseUserInput(formData: any, state: ScenarioState): string {
        const string = formData[this.key] as string;
        return string;
    }

    /** Computes the prop to be used in the back-end, based on the user defined value. */
    evaluateDefinitionProp(defProps: any, state: ScenarioState): string {
        return defProps[this.key] as string;
    }
}
