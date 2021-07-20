import { AssetSchema } from '../../content/Asset/AssetSchema';
import { ContentTypeProps, DefTypesOfContentTypeProps } from '../../content/Common/PropRecord/ContentTypeProps';
import { AssetDef } from '../../definition/Asset/AssetDef';
import { AssetDesc } from '../../description/Asset/AssetDesc';
import { ScenarioState } from '../State/ScenarioState';

export abstract class Asset<Props extends ContentTypeProps> {
    abstract readonly schema: AssetSchema<Props>;

    constructor(
        readonly id: string,
        readonly defProps: DefTypesOfContentTypeProps<Props>,
        readonly isInitial: boolean = false,
    ) {}

    /** Provide a generic description of this action for viewing purposes */
    describe(state: ScenarioState): AssetDesc<Props> {
        return {
            isInitial: this.isInitial,
            parentId: this.defProps.parentId,
            id: this.id,
            type: this.schema.typeName,
            kind: this.schema.kindName,
            title: this.schema.title,
            props: this.defProps,
            propertyDesc: Object.entries(this.schema.props.props).map(([key, prop]) => ({
                title: prop.title,
                value: { EN: this.defProps[key], NL: this.defProps[key] },
            })),
            ...this._describe(state),
        };
    }

    /** Provide a generic description of this action for viewing purposes */
    abstract _describe(state: ScenarioState): CustomAssetDesc;

    serialize(): AssetDef<Props> {
        return { id: this.id, props: this.defProps, typeName: this.schema.typeName };
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
    'parentId' | 'id' | 'type' | 'kind' | 'isInitial' | 'props' | 'title' | 'propertyDesc'
>;

export type CustomAssetDesc = Omit<AssetDesc, keyof AssetBaseDesc> & Partial<AssetDesc>;
