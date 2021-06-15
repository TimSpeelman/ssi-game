import { translations } from '../../../intl/dictionaries';
import { Translation } from '../../../intl/Language';
import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    subjectId: string;
}

const title: Translation = {
    NL: 'Gezicht',
    EN: 'Face',
};
export class FaceFeature extends Asset<Props> {
    protected typeName = 'FaceFeature';
    protected kindName = 'Feature';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'FaceFeature',
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
