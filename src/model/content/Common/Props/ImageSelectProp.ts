import { Translation } from '../../../../intl/Language';
import { ImageOrIconDefinition } from '../../../common/ImageOrIconDefinition';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { IPropHandler } from '../Schema/IPropHandler';
import { ImageSelectField } from './ImageSelectField';

export interface ImageSelectPropOptions {
    title: Translation;
    helperText?: Translation;
    items: Array<{ id: string; image: ImageOrIconDefinition; title?: Translation }>;
    required?: Translation | boolean;
}

export class ImageSelectProp implements IPropHandler<string, ImageOrIconDefinition, ImageSelectField> {
    get title() {
        return this.options.title;
    }

    constructor(readonly options: ImageSelectPropOptions) {}

    extend(options: Partial<ImageSelectPropOptions>) {
        return new ImageSelectProp({ ...this.options, ...options });
    }

    /** Computes the default value. */
    getDefaultValue() {
        return '';
    }

    /** Computes the field properties to display in the creation or edit form. */
    getFormFieldProps(key: string, formData: any, state: ScenarioState): ImageSelectField {
        const defaultValue = this.getDefaultValue();
        const value = !formData[key] || formData[key] === '' ? defaultValue : formData[key];

        const hasError = !value && this.options.required;
        const errorMessage =
            typeof this.options.required === 'object'
                ? this.options.required
                : {
                      NL: 'Dit veld is vereist',
                      EN: 'This field is required',
                  };

        return {
            type: 'image-select',
            title: this.options.title,
            helperText: this.options.helperText,
            options: this.options.items,
            value: value,
            error: hasError ? errorMessage : undefined,
            required: !!this.options.required,
        };
    }

    /** Parses the prop */
    parseUserInput(key: string, formData: any, state: ScenarioState): string {
        const selectedId = formData[key] as string;
        return selectedId;
    }

    /** Computes the prop to be used in the back-end, based on the user defined value. */
    evaluateDefinitionProp(key: string, defProps: any, state: ScenarioState): ImageOrIconDefinition | undefined {
        const selectedId = defProps[key] as string;
        const selectedOption = this.options.items.find((i) => i.id === selectedId);
        return selectedOption?.image;
    }

    /** Validate whether the prop requirements are satisfied */
    validateDefinitionProp(key: string, defProps: any, state: ScenarioState): Translation | undefined {
        return undefined;
    }
}
