import { Translation } from '../../../../intl/Language';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { Field } from '../View/Field';
import { IContentTypeProp } from './IContentTypeProp';

export interface ImageSelectPropOptions {
    title: Translation;
    items: Array<{ id: string; imageUrl: string; title?: Translation }>;
}

export class ImageSelectProp implements IContentTypeProp<string, string> {
    get title() {
        return this.options.title;
    }

    constructor(readonly options: ImageSelectPropOptions) {}

    /** Computes the default value. */
    getDefaultValue() {
        return '';
    }

    /** Computes the field properties to display in the creation or edit form. */
    getFormFieldProps(key: string, formData: any, state: ScenarioState): Field {
        const defaultValue = this.getDefaultValue();
        const value = !formData[key] || formData[key] === '' ? defaultValue : formData[key];
        return {
            type: 'image-select',
            title: this.options.title,
            options: this.options.items,
            value: value,
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
