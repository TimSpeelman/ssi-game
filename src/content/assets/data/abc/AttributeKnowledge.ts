import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    subjectId: string;
    name: string;
    value: string;
    issuerId: string;
}

/** Attribute Knowledge means that the possessing Actor knows a particular attribute value of some subject */
export class AttributeKnowledge extends Asset<Props> {
    protected typeName = 'AttributeKnowledge';
    protected kindName = 'Data';

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

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.props),
            title: 'Attribuutkennis',
        };
    }
}
