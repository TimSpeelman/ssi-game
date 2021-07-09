import { keyByFn } from '../../../util/util';
import { AssetDef } from '../../definition/Asset/AssetDef';
import { Asset } from '../../logic/Asset/Asset';
import { AssetType } from './AssetType';

export class AssetTypesCollection {
    readonly typesRecord: Record<string, AssetType<any>>;

    constructor(readonly types: AssetType<any>[]) {
        this.typesRecord = keyByFn(types, (t) => t.schema.typeName);
    }

    requireTypeByName(typeName: string): AssetType<any> {
        if (typeName in this.typesRecord) {
            return this.typesRecord[typeName];
        } else {
            throw new Error(`Asset with type name '${typeName}' unknown`);
        }
    }

    deserialize(s: AssetDef<any>): Asset<any> {
        const type = this.requireTypeByName(s.typeName);
        return type.factory(s.id, s.props);
    }

    listTypeNames(): string[] {
        return this.types.map((t) => t.schema.typeName);
    }
}
