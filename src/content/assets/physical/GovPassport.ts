import { AssetDesc } from '../../../model/description/Asset/AssetDesc';
import { Asset } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { FaceScan } from '../data/feature/FaceScan';

export interface Props {
    name: string;
    photo: FaceScan;
    subjectId: string;
}

/** Possession means that the subject has these fingerprints. Non-transferrable. FingerprintScan can however be transferred. */
export class GovPassport extends Asset<Props> {
    protected typeName = GovPassport.name;

    describe(state: ScenarioState): AssetDesc {
        return {
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Paspoort',
        };
    }
}
