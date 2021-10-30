import { Translation } from '../../../../intl/Language';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { IPropHandler } from '../Schema/IPropHandler';
import { StringField } from './StringField';

export interface StringPropOptions {
    title: Translation;
    helperText?: Translation;
    multiline?: boolean;
    default?: string | (() => string);
    required?: Translation | boolean;
}

export class StringProp implements IPropHandler<string, string, StringField> {
    get title() {
        return this.options.title;
    }

    constructor(readonly options: StringPropOptions) {}

    extend(options: Partial<StringPropOptions>) {
        return new StringProp({ ...this.options, ...options });
    }

    /** Computes the default value. */
    getDefaultValue() {
        if (!this.options.default) {
            return '';
        }
        return typeof this.options.default === 'string' ? this.options.default : this.options.default();
    }

    /** Computes the field properties to display in the creation or edit form. */
    getFormFieldProps(key: string, formData: any, state: ScenarioState): StringField {
        const hasError = !formData[key] && this.options.required;
        const errorMessage =
            typeof this.options.required === 'object'
                ? this.options.required
                : {
                      NL: 'Dit veld is vereist',
                      EN: 'This field is required',
                  };

        return {
            type: 'string',
            multiline: this.options.multiline,
            title: this.options.title,
            helperText: this.options.helperText,
            value: formData[key],
            error: hasError ? errorMessage : undefined,
            required: !!this.options.required,
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
