import { translations } from '../../../../intl/dictionaries';
import { Translation } from '../../../../intl/Language';
import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetSchema';

export interface Props extends AssetBaseProps {
    subjectId: string;
}

const title: Translation = {
    NL: 'Portret',
    EN: 'Face Scan',
};
export class FaceScan extends Asset<Props> {
    protected typeName = 'FaceScan';
    protected kindName = 'Data';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'FaceScan',
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
