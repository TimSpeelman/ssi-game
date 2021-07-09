import { translations } from '../../../intl/dictionaries';
import { Translation } from '../../../intl/Language';
import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../model/view/AssetSchema';

export interface Props extends AssetBaseProps {
    name: string;
    subjectId: string;
}

const title: Translation = {
    NL: 'Paspoort',
    EN: 'Passport',
};
/** Possession means that the subject has these fingerprints. Non-transferrable. FingerprintScan can however be transferred. */
export class GovPassport extends Asset<Props> {
    protected typeName = 'GovPassport';
    protected kindName = 'Physical';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'GovPassport',
        title: title,
        fields: {
            subjectId: { type: 'actor', title: translations.subject },
            name: { type: 'string', title: translations.name },
        },
    };

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.props),
            title: title,
        };
    }
}
