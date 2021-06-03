import { AssetDesc } from '../../../../model/description/Asset/AssetDesc';
import { Asset } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetFormConfig';

export interface Props {
    subjectId: string;
    name: string;
    value: string;
    issuerId: string;
}

/** Attribute Knowledge means that the possessing Actor knows a particular attribute value of some subject */
export class AttributeKnowledge extends Asset<Props> {
    protected typeName = 'AttributeKnowledge';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'AttributeKnowledge',
        title: 'Attribuutkennis',
        fields: {
            subjectId: { type: 'actor', title: 'Subject' },
            issuerId: { type: 'actor', title: 'Issuer' },
            name: { type: 'string', title: 'Attribuutnaam' },
            value: { type: 'string', title: 'Attribuutwaarde' },
        },
    };

    describe(state: ScenarioState): AssetDesc {
        return {
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Attribuutkennis',
        };
    }
}
