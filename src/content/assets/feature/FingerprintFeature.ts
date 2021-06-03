import { AssetDesc } from '../../../model/description/Asset/AssetDesc';
import { Asset } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../model/view/AssetFormConfig';

export interface Props {
    subjectId: string;
}

/** Possession means that the subject has these fingerprints. Non-transferrable. FingerprintScan can however be transferred. */
export class FingerprintFeature extends Asset<Props> {
    protected typeName = 'FingerprintFeature';

    static config: AssetFormConfig<keyof Props> = {
        title: 'Vingerafdruk',
        fields: {
            subjectId: { type: 'actor', title: 'Subject' },
        },
    };

    describe(state: ScenarioState): AssetDesc {
        return {
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Vingerafdruk',
        };
    }
}
