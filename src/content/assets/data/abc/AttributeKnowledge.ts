import { translations } from '../../../../intl/dictionaries';
import { Translation } from '../../../../intl/Language';
import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetSchema';

export interface Props extends AssetBaseProps {
    subjectId: string;
    name: string;
    value: string;
    issuerId: string;
}

const title: Translation = {
    NL: 'Attribuutkennis',
    EN: 'Attribute knowledge',
};
/** Attribute Knowledge means that the possessing Actor knows a particular attribute value of some subject */
export class AttributeKnowledge extends Asset<Props> {
    protected typeName = 'AttributeKnowledge';
    protected kindName = 'Data';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'AttributeKnowledge',
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
