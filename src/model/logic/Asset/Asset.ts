import { AssetDef } from '../../definition/Asset/AssetDef';
import { AssetDesc } from '../../description/Asset/AssetDesc';
import { ScenarioState } from '../State/ScenarioState';

export abstract class Asset<Props extends AssetBaseProps = any> {
    /** Type Name used for serialization */
    protected abstract readonly typeName: string;
    /** Kind Name used for categorization */
    protected abstract readonly kindName: string;

    constructor(readonly id: string, readonly props: Props, readonly isInitial: boolean = false) {}

    /** Provide a generic description of this action for viewing purposes */
    describe(state: ScenarioState): AssetDesc<Props> {
        return {
            ...this._describe(state),
            isInitial: this.isInitial,
            parentId: this.props.parentId,
            id: this.id,
            type: this.typeName,
            kind: this.kindName,
            props: this.props,
        };
    }

    /** Provide a generic description of this action for viewing purposes */
    abstract _describe(state: ScenarioState): CustomAssetDesc;

    serialize(): AssetDef<Props> {
        return { id: this.id, props: this.props, typeName: this.typeName };
    }
}

export interface AssetBaseProps {
    parentId?: string;
}

export type AssetBaseDesc = Pick<AssetDesc, 'parentId' | 'id' | 'type' | 'kind' | 'isInitial' | 'props'>;

export type CustomAssetDesc = Omit<AssetDesc, keyof AssetBaseDesc>;
