import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    subjectId: string;
    attributeId: string;
    issuerId: string;
}

/** Attribute Knowledge means that the possessing Actor knows a particular attribute value of some subject */
export class AttributeRevocation extends Asset<Props> {
    protected typeName = 'AttributeRevocation';
    protected kindName = 'Data';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'AttributeRevocation',
        title: 'Attribuutrevocatie',
        fields: {
            subjectId: { type: 'actor', title: 'Subject' },
            issuerId: { type: 'actor', title: 'Issuer' },
            attributeId: { type: 'string', title: 'Attribuut' },
        },
    };

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.props),
            title: 'Attribuutrevocatie',
        };
    }
}
