import { AssetDesc } from '../../../../model/description/Asset/AssetDesc';
import { Asset } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetFormConfig';

export interface Props {
    name: string;
    value: string;
    issuerId: string;
    subjectId: string;
}

/**
 * Attribute Proof is equivalent to Attribute Knowledge, except it enables the possessing Actor to prove it.
 * - Note: a proof could be decomposed into other data elements, but this simplification is made for ease of play.
 */
export class AttributeProof extends Asset<Props> {
    protected typeName = 'AttributeProof';

    static config: AssetFormConfig<keyof Props> = {
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
            title: 'Attribuutbewijs',
        };
    }
}
