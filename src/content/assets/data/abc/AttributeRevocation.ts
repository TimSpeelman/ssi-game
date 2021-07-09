import { translations } from '../../../../intl/dictionaries';
import { Translation } from '../../../../intl/Language';
import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetSchema';

export interface Props extends AssetBaseProps {
    subjectId: string;
    attributeId: string;
    issuerId: string;
}

const title: Translation = {
    NL: 'Attribuutrevocatie',
    EN: 'Attribute revocation',
};
/** Attribute Knowledge means that the possessing Actor knows a particular attribute value of some subject */
export class AttributeRevocation extends Asset<Props> {
    protected typeName = 'AttributeRevocation';
    protected kindName = 'Data';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'AttributeRevocation',
        title: title,
        fields: {
            subjectId: { type: 'actor', title: translations.subject },
            issuerId: { type: 'actor', title: translations.issuer },
            attributeId: { type: 'string', title: translations.attribute },
        },
    };

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.props),
            title: title,
        };
    }
}
