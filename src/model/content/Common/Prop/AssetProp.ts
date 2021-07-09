import { Language, Translation } from '../../../../intl/Language';
import { AssetTreeNode } from '../../../description/Asset/AssetTreeNode';
import { Asset } from '../../../logic/Asset/Asset';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { Field } from '../View/Field';
import { IContentTypeProp } from './IContentTypeProp';

export interface AssetPropOptions {
    title: Translation;
    dependsOn?: string[];
    filter?: (a: AssetTreeNode, formData: any) => boolean;
    autoFill?: boolean;
}

export class AssetProp implements IContentTypeProp<string, Asset<any>> {
    get title() {
        return this.options.title;
    }

    constructor(readonly key: string, readonly options: AssetPropOptions) {}

    /** Computes the default value. */
    getDefaultValue() {
        return '';
    }

    /** Computes the field properties to display in the creation or edit form. */
    getFormFieldProps(formData: any, state: ScenarioState): Field {
        const allItems = Object.values(state.describe().assets);
        console.log('all assets', allItems);
        const filteredItems = !!this.options.filter
            ? allItems.filter((a) => this.options.filter!(a, formData))
            : allItems;
        const items = filteredItems.map((a) => a.asset);

        const disabled = (this.options.dependsOn || []).every((k) => !!formData[k])
            ? undefined
            : {
                  [Language.EN]: 'This field depends on ' + this.options.dependsOn!.join(', '),
                  [Language.NL]: 'Dit veld is afhankelijk van ' + this.options.dependsOn!.join(', '),
              };

        const autoFill = this.options.autoFill ? items[0]?.id : undefined;
        const defaultValue = autoFill || this.getDefaultValue();
        const value = !formData[this.key] || formData[this.key] === '' ? defaultValue : formData[this.key];
        return {
            type: 'asset',
            title: this.options.title,
            options: items,
            // @ts-ignore
            value: value,
            disabled,
        };
    }

    /** Parses the prop */
    parseUserInput(formData: any, state: ScenarioState): string {
        const assetId = formData[this.key] as string;
        return assetId;
    }

    /** Computes the prop to be used in the back-end, based on the user defined value. */
    evaluateDefinitionProp(defProps: any, state: ScenarioState): Asset<any> | undefined {
        const assetId = defProps[this.key] as string;
        const assets = Object.values(state.props.byActor)
            .map((a) => a.assets)
            .reduce((a, b) => [...a, ...b], []);
        return assets.find((a) => a.id === assetId);
    }
}
