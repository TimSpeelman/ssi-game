import { Translation } from '../../../../intl/Language';
import { AssetDesc } from '../../../description/Asset/AssetDesc';
import { Asset } from '../../../logic/Asset/Asset';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { Field } from '../View/Field';
import { IContentTypeProp } from './IContentTypeProp';

export interface AssetPropOptions {
    title: Translation;
    dependsOn?: string[];
    filter?: (a: AssetDesc) => boolean;
    autoFill?: boolean;
}

export class AssetProp<FormData> implements IContentTypeProp<string, Asset<any>> {
    constructor(readonly key: keyof FormData, readonly options: AssetPropOptions) {}

    /** Computes the default value. */
    getDefaultValue() {
        return '';
    }

    /** Computes the field properties to display in the creation or edit form. */
    getFormFieldProps(formData: any, state: ScenarioState): Field {
        return {
            type: 'asset',
            title: this.options.title,
            options: [], // TODO
            // @ts-ignore
            value: formData[this.key],
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
