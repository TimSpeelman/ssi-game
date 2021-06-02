import { AssetDesc } from '../../../../model/description/Asset/AssetDesc';
import { Asset } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';

export interface Props {
    sourceId: string;
    targetId: string;
}

export class AuthenticationResult extends Asset<Props> {
    protected typeName = AuthenticationResult.name;

    describe(state: ScenarioState): AssetDesc {
        return {
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Authenticatieresultaat',
        };
    }
}
