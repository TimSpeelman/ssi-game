import { Translation } from '../../../intl/Language';
import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../model/view/AssetSchema';

export type Props = AssetBaseProps;

const title: Translation = {
    NL: 'Wallet',
    EN: 'Wallet',
};

export class Wallet extends Asset<Props> {
    protected typeName = 'Wallet';
    protected kindName = 'Software';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'Wallet',
        title: title,
        fields: {},
    };

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.props),
            title: title,
            canHaveChildren: true,
        };
    }
}
