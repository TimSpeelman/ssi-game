import { AssetSchema, TypeOfAssetSchema } from '../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';

const Schema = new AssetSchema({
    typeName: 'Wallet',
    kindName: 'Software',
    title: {
        NL: 'Wallet',
        EN: 'Wallet',
    },
    props: {},
});

export type Props = TypeOfAssetSchema<typeof Schema>;

export class Wallet extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.defProps),
            canHaveChildren: true,
        };
    }
}

export const WalletType = new AssetType(Schema, (id, props, isInitial) => new Wallet(id, props, isInitial));
