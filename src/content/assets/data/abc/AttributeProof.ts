import { translations } from '../../../../intl/dictionaries';
import { Translation } from '../../../../intl/Language';
import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetSchema';

export interface Props extends AssetBaseProps {
    name: string;
    value: string;
    issuerId: string;
    subjectId: string;
}

const title: Translation = {
    NL: 'Attribuutbewijs',
    EN: 'Attribute proof',
};
/**
 * Attribute Proof is equivalent to Attribute Knowledge, except it enables the possessing Actor to prove it.
 * - Note: a proof could be decomposed into other data elements, but this simplification is made for ease of play.
 */
export class AttributeProof extends Asset<Props> {
    protected typeName = 'AttributeProof';
    protected kindName = 'Data';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'AttributeProof',
        title: title,
        fields: {
            subjectId: { type: 'actor', title: translations.subject },
            issuerId: { type: 'actor', title: translations.issuer },
            name: { type: 'string', title: translations.attributeName },
            value: { type: 'string', title: translations.attributeValue },
        },
    };

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.props),
            title: title,
        };
    }
}
