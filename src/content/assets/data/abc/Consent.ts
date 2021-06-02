import { AssetDesc } from '../../../../model/description/Asset/AssetDesc';
import { Asset } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';

export interface Props {
    attributeName: string;
    verifierId: string;
    subjectId: string;
}

export class Consent extends Asset<Props> {
    protected typeName = Consent.name;

    describe(state: ScenarioState): AssetDesc {
        return {
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Toestemming',
        };
    }
}
