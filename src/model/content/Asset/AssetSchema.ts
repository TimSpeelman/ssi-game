import { Translation } from '../../../intl/Language';
import { Extend } from '../../../util/types/Extend';
import { mapValues } from '../../../util/util';
import { ImageOrIconDefinition } from '../../common/ImageOrIconDefinition';
import { AssetDef } from '../../definition/Asset/AssetDef';
import { ScenarioState } from '../../logic/State/ScenarioState';
import { PropEvaluatedValues } from '../Common/Schema/PropEvaluatedValues';
import { PropHandlerCollection } from '../Common/Schema/PropHandlerCollection';
import { PropValues } from '../Common/Schema/PropValues';
import { RecordOfPropHandlers } from '../Common/Schema/RecordOfPropHandlers';

type AssetSchemaOptions<Props extends RecordOfPropHandlers> = {
    typeName: string;
    kindName: string;
    title: Translation;
    abbr?: Translation;
    image?: ImageOrIconDefinition;
    description?: Translation;
    props: Props;
};

/**
 * Define a custom asset type schema
 */
export class AssetSchema<Props extends RecordOfPropHandlers> {
    readonly typeName: string;
    readonly kindName: string;
    readonly title: Translation;
    readonly abbr?: Translation;
    readonly image?: ImageOrIconDefinition;
    readonly description?: Translation;
    readonly props: PropHandlerCollection<Props>;

    constructor(options: AssetSchemaOptions<Props>) {
        this.typeName = options.typeName;
        this.kindName = options.kindName;
        this.title = options.title;
        this.abbr = options.abbr;
        this.image = options.image;
        this.description = options.description;
        this.props = new PropHandlerCollection(options.props);
    }

    extend<NewProps extends RecordOfPropHandlers>(
        options: AssetSchemaOptions<NewProps>,
    ): AssetSchema<Extend<Props, NewProps>> {
        const props: Extend<Props, NewProps> = { ...this.props.props, ...options.props };
        return new AssetSchema({ ...options, props });
    }

    /** Compute display properties */
    computeDisplayProperties(defProps: PropValues<Props>) {
        return mapValues(this.props.props, (p, key) => ({
            title: p.title,
            value: defProps[key],
        }));
    }

    /** Compute the form properties */
    computeFormProperties(formData: any, state: ScenarioState) {
        return this.props.getFormFieldProps(formData, state);
    }

    /** Compute the form properties */
    getFormDefaults() {
        return this.props.getDefaultValues();
    }

    /** Based on the active state and the form input, compute the ActionDef */
    parseUserInput(id: string, formData: any, state: ScenarioState, parentId?: string): AssetDef<PropValues<Props>> {
        return {
            id: id,
            props: this.props.parseUserInput(formData, state),
            typeName: this.typeName,
            parentId: parentId,
        };
    }

    /** Based on the active state and the definition, evaluate the props */
    evaluateDefinitionProps(defProps: PropValues<Props>, state: ScenarioState): PropEvaluatedValues<Props> {
        return this.props.evaluateDefinitionProps(defProps, state);
    }
}

export interface BaseProps {
    parentId?: string;
}

export type TypeOfAssetSchema<T extends AssetSchema<any>> = T extends AssetSchema<infer U> & BaseProps ? U : never;

export type DefTypeOfAssetSchema<T extends AssetSchema<any>> = T extends AssetSchema<infer U> ? PropValues<U> : never;
