import { Translation } from '../../../intl/Language';
import { mapValues } from '../../../util/util';
import { AssetDef } from '../../definition/Asset/AssetDef';
import { ScenarioState } from '../../logic/State/ScenarioState';
import {
    ContentTypeProps,
    DefTypesOfContentTypeProps,
    EvaluatedTypeOfContentProps,
} from '../Common/PropRecord/ContentTypeProps';
import { ContentTypePropsRecord } from '../Common/PropRecord/ContentTypePropsRecord';

/**
 * Define a custom asset type schema
 */
export class AssetSchema<Props extends ContentTypeProps> {
    readonly typeName: string;
    readonly kindName: string;
    readonly title: Translation;
    readonly props: ContentTypePropsRecord<Props>;

    constructor(options: { typeName: string; kindName: string; title: Translation; props: Props }) {
        this.typeName = options.typeName;
        this.kindName = options.kindName;
        this.title = options.title;
        this.props = new ContentTypePropsRecord(options.props);
    }

    /** Compute display properties */
    computeDisplayProperties(defProps: any) {
        return mapValues(this.props.props, (p, key) => ({
            title: p.title,
            value: defProps[key],
        }));
    }

    /** Compute the form properties */
    computeFormProperties(formData: any, state: ScenarioState) {
        return this.props.getFormFieldProps(formData, state);
    }

    /** Based on the active state and the form input, compute the ActionDef */
    parseUserInput(id: string, formData: any, state: ScenarioState): AssetDef {
        return {
            id: id,
            props: this.props.parseUserInput(formData, state),
            typeName: this.typeName,
        };
    }

    /** Based on the active state and the definition, evaluate the props */
    evaluateDefinitionProps(defProps: any, state: ScenarioState): EvaluatedTypeOfContentProps<Props> {
        return this.props.evaluateDefinitionProps(defProps, state);
    }
}

export type TypeOfAssetSchema<T extends AssetSchema<any>> = T extends AssetSchema<infer U> ? U : never;

export type DefTypeOfAssetSchema<T extends AssetSchema<any>> = T extends AssetSchema<infer U>
    ? DefTypesOfContentTypeProps<U>
    : never;
