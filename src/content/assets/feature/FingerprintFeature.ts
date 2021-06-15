import { translations } from '../../../intl/dictionaries';
import { Translation } from '../../../intl/Language';
import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    subjectId: string;
}

const title: Translation = {
    NL: 'Vingerafdruk',
    EN: 'Fingerprint',
};
/** Possession means that the subject has these fingerprints. Non-transferrable. FingerprintScan can however be transferred. */
export class FingerprintFeature extends Asset<Props> {
    protected typeName = 'FingerprintFeature';
    protected kindName = 'Feature';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'FingerprintFeature',
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
