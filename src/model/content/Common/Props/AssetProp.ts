import { Translation } from '../../../../intl/Language';
import { AssetTreeNode } from '../../../description/Asset/AssetTreeNode';
import { Asset } from '../../../logic/Asset/Asset';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { IPropHandler } from '../Schema/IPropHandler';
import { AssetField } from './AssetField';

export interface AssetPropOptions {
    title: Translation;
    helperText?: Translation;
    dependsOn?: string[];
    filter?: (a: AssetTreeNode, formData: any) => boolean;
    autoFill?: boolean;
    required?: Translation;
}

export class AssetProp implements IPropHandler<string, Asset<any>, AssetField> {
    get title() {
        return this.options.title;
    }

    constructor(readonly options: AssetPropOptions) {}

    extend(options: Partial<AssetPropOptions>) {
        return new AssetProp({ ...this.options, ...options });
    }

    /** Computes the default value. */
    getDefaultValue() {
        return '';
    }

    /** Computes the field properties to display in the creation or edit form. */
    getFormFieldProps(key: string, formData: any, state: ScenarioState): AssetField {
        const allItems = Object.values(state.describe().assets);
        const filteredItems = !!this.options.filter
            ? allItems.filter((a) => this.options.filter!(a, formData))
            : allItems;
        const items = filteredItems.map((a) => a.asset);

        const disabled = (this.options.dependsOn || []).every((k) => !!formData[k])
            ? undefined
            : {
                  EN: 'This field depends on ' + this.options.dependsOn!.join(', '),
                  NL: 'Dit veld is afhankelijk van ' + this.options.dependsOn!.join(', '),
              };

        const autoFill = this.options.autoFill ? items[0]?.id : undefined;
        const defaultValue = autoFill || this.getDefaultValue();
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
            type: 'asset',
            title: this.options.title,
            helperText: this.options.helperText,
            options: items,
            // @ts-ignore
            value: value,
            disabled,
            error: hasError ? errorMessage : undefined,
            required: !!this.options.required,
        };
    }

    /** Parses the prop */
    parseUserInput(key: string, formData: any, state: ScenarioState): string {
        const assetId = formData[key] as string;
        return assetId;
    }

    /** Computes the prop to be used in the back-end, based on the user defined value. */
    evaluateDefinitionProp(key: string, defProps: any, state: ScenarioState): Asset<any> | undefined {
        const assetId = defProps[key] as string;
        const assets = Object.values(state.props.byActor)
            .map((a) => a.assets)
            .reduce((a, b) => [...a, ...b], []);
        return assets.find((a) => a.id === assetId);
    }

    /** Validate whether the prop requirements are satisfied */
    validateDefinitionProp(key: string, defProps: any, state: ScenarioState): Translation | undefined {
        if (this.options.required && (!defProps[key] || !this.evaluateDefinitionProp(key, defProps, state))) {
            return this.options.required;
        }
    }
}
