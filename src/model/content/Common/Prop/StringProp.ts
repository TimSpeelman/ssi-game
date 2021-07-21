import { Translation } from '../../../../intl/Language';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { Field } from '../View/Field';
import { IContentTypeProp } from './IContentTypeProp';

export interface StringPropOptions {
    title: Translation;
    helperText?: Translation;
    multiline?: boolean;
}

export class StringProp implements IContentTypeProp<string, string> {
    get title() {
        return this.options.title;
    }

    constructor(readonly options: StringPropOptions) {}

    /** Computes the default value. */
    getDefaultValue() {
        return '';
    }

    /** Computes the field properties to display in the creation or edit form. */
    getFormFieldProps(key: string, formData: any, state: ScenarioState): Field {
        return {
            type: 'string',
            multiline: this.options.multiline,
            title: this.options.title,
            helperText: this.options.helperText,
            value: formData[key] || this.getDefaultValue(),
        };
    }

    /** Parses the prop */
    parseUserInput(key: string, formData: any, state: ScenarioState): string {
        const string = formData[key] as string;
        return string;
    }

    /** Computes the prop to be used in the back-end, based on the user defined value. */
    evaluateDefinitionProp(key: string, defProps: any, state: ScenarioState): string {
        return defProps[key] as string;
    }

    /** Validate whether the prop requirements are satisfied */
    validateDefinitionProp(key: string, defProps: any, state: ScenarioState): Translation | undefined {
        return undefined;
    }
}
