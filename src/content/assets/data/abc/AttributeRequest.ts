import { AssetDesc } from '../../../../model/description/Asset/AssetDesc';
import { Asset } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';

export interface Props {
    id: string;
    name: string;
    verifierId: string;
    subjectId: string;
}

export class AttributeRequest extends Asset<Props> {
    protected typeName = AttributeRequest.name;

    describe(state: ScenarioState): AssetDesc {
        return {
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'AttribuutVerzoek',
        };
    }
}
