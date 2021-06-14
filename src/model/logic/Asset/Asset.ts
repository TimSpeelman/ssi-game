import { AssetDef } from '../../definition/Asset/AssetDef';
import { AssetDesc } from '../../description/Asset/AssetDesc';
import { ScenarioState } from '../State/ScenarioState';

export abstract class Asset<Props extends AssetBaseProps = any> {
    /** Type Name used for serialization */
    protected abstract readonly typeName: string;

    constructor(readonly id: string, readonly props: Props) {}

    /** Provide a generic description of this action for viewing purposes */
    abstract describe(state: ScenarioState): AssetDesc;

    serialize(): AssetDef<Props> {
        return { id: this.id, props: this.props, typeName: this.typeName };
    }
}

export interface AssetBaseProps {
    parentId?: string;
}
