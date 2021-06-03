import { AssetDesc } from '../../../model/description/Asset/AssetDesc';
import { Asset } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../model/view/AssetFormConfig';

export interface Props {
    name: string;
    subjectId: string;
}

/** Possession means that the subject has these fingerprints. Non-transferrable. FingerprintScan can however be transferred. */
export class GovPassport extends Asset<Props> {
    protected typeName = 'GovPassport';

    static config: AssetFormConfig<keyof Props> = {
        title: 'Paspoort',
        fields: {
            subjectId: { type: 'actor', title: 'Subject' },
            name: { type: 'string', title: 'Naam' },
        },
    };

    describe(state: ScenarioState): AssetDesc {
        return {
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Paspoort',
        };
    }
}
