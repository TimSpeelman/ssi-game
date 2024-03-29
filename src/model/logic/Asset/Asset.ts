import { AssetSchema } from '../../content/Asset/AssetSchema';
import { PropValues } from '../../content/Common/Schema/PropValues';
import { RecordOfPropHandlers } from '../../content/Common/Schema/RecordOfPropHandlers';
import { AssetDef } from '../../definition/Asset/AssetDef';
import { AssetDesc } from '../../description/Asset/AssetDesc';
import { ScenarioState } from '../State/ScenarioState';

export abstract class Asset<Props extends RecordOfPropHandlers> {
    abstract readonly schema: AssetSchema<Props>;

    constructor(
        readonly id: string,
        readonly defProps: PropValues<Props>,
        readonly isInitial: boolean = false,
        readonly parentId?: string,
    ) {}

    /** Provide a generic description of this action for viewing purposes */
    describe(state: ScenarioState): AssetDesc {
        return {
            isInitial: this.isInitial,
            parentId: this.parentId,
            id: this.id,
            type: this.schema.typeName,
            kind: this.schema.kindName,
            title: this.schema.title,
            abbr: this.schema.abbr,
            image: this.schema.image,
            props: this.defProps,
            cloneable: false,
            transferrable: false,
            propertyDesc: Object.entries(this.schema.props.props).map(([key, prop]) => ({
                title: prop.title,
                value: { EN: this.defProps[key], NL: this.defProps[key] },
            })),
            ...this._describe(state),
        };
    }

    /** Provide a generic description of this action for viewing purposes */
    abstract _describe(state: ScenarioState): CustomAssetDesc;

    serialize(): AssetDef {
        return { id: this.id, props: this.defProps, typeName: this.schema.typeName, parentId: this.parentId };
    }

    evaluateProps(state: ScenarioState) {
        return this.schema.evaluateDefinitionProps(this.defProps, state);
    }
}

export interface AssetBaseProps {
    parentId?: string;
}

export type AssetBaseDesc = Pick<
    AssetDesc,
    | 'parentId'
    | 'id'
    | 'type'
    | 'kind'
    | 'isInitial'
    | 'props'
    | 'title'
    | 'abbr'
    | 'propertyDesc'
    | 'transferrable'
    | 'cloneable'
>;

export type CustomAssetDesc = Omit<AssetDesc, keyof AssetBaseDesc> & Partial<AssetDesc>;
