import { AssetDesc } from '../../../../model/description/Asset/AssetDesc';
import { Asset } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';

export interface Props {
    subjectId: string;
    name: string;
    value: string;
    issuerId: string;
}

/** Attribute Knowledge means that the possessing Actor knows a particular attribute value of some subject */
export class AttributeKnowledge extends Asset<Props> {
    protected typeName = AttributeKnowledge.name;

    describe(state: ScenarioState): AssetDesc {
        return {
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Attribuutkennis',
        };
    }
}
