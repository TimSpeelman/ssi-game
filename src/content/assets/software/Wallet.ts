import { Asset, AssetBaseProps } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../model/view/AssetFormConfig';

export type Props = AssetBaseProps;

export class Wallet extends Asset<Props> {
    protected typeName = 'Wallet';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'Wallet',
        title: 'Wallet',
        fields: {},
    };

    _describe(state: ScenarioState) {
        return {
            sub: JSON.stringify(this.props),
            title: 'Wallet',
        };
    }
}
