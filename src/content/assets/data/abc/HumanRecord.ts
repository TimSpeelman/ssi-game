import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    subjectId: string;
}

export class HumanRecord extends Asset<Props> {
    protected typeName = 'HumanRecord';
    protected kindName = 'Data';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'HumanRecord',
        title: 'Administratief Beeld',
        fields: {
            subjectId: { type: 'actor', title: 'Subject' },
        },
    };

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.props),
            title: 'Administratief Beeld',
        };
    }
}
