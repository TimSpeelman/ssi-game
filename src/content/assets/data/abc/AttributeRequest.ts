import { translations } from '../../../../intl/dictionaries';
import { Translation } from '../../../../intl/Language';
import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetSchema';

export interface Props extends AssetBaseProps {
    name: string;
    verifierId: string;
    subjectId: string;
}

const title: Translation = {
    NL: 'Attribuutverzoek',
    EN: 'Attribuut request',
};
export class AttributeRequest extends Asset<Props> {
    protected typeName = 'AttributeRequest';
    protected kindName = 'Data';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'AttributeRequest',
        title: title,
        fields: {
            subjectId: { type: 'actor', title: translations.subject },
            verifierId: { type: 'actor', title: translations.verifier },
            name: { type: 'string', title: translations.attributeName },
        },
    };

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.props),
            title: title,
        };
    }
}
