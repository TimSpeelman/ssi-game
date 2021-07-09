import { translations } from '../../../../intl/dictionaries';
import { Translation } from '../../../../intl/Language';
import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetSchema';

export interface Props extends AssetBaseProps {
    subjectId: string;
}

const title: Translation = {
    NL: 'Administratief Beeld',
    EN: 'Human Record',
};
export class HumanRecord extends Asset<Props> {
    protected typeName = 'HumanRecord';
    protected kindName = 'Data';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'HumanRecord',
        title: title,
        fields: {
            subjectId: { type: 'actor', title: translations.subject },
        },
    };

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.props),
            title: title,
        };
    }
}
