import { AssetDesc } from '../../../model/description/Asset/AssetDesc';
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

    describe(state: ScenarioState): AssetDesc {
        return {
            parentId: this.props.parentId,
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Wallet',
        };
    }
}
