import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    name: string;
    subjectId: string;
}

/** Possession means that the subject has these fingerprints. Non-transferrable. FingerprintScan can however be transferred. */
export class GovPassport extends Asset<Props> {
    protected typeName = 'GovPassport';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'GovPassport',
        title: 'Paspoort',
        fields: {
            subjectId: { type: 'actor', title: 'Subject' },
            name: { type: 'string', title: 'Naam' },
        },
    };

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.props),
            title: 'Paspoort',
        };
    }
}
