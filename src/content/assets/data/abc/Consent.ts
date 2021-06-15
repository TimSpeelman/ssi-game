import { translations } from '../../../../intl/dictionaries';
import { Translation } from '../../../../intl/Language';
import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    attributeName: string;
    verifierId: string;
    subjectId: string;
}

const title: Translation = {
    NL: 'Toestemming',
    EN: 'Consent',
};
export class Consent extends Asset<Props> {
    protected typeName = 'Consent';
    protected kindName = 'Data';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'Consent',
        title: title,
        fields: {
            subjectId: { type: 'actor', title: translations.subject },
            verifierId: { type: 'actor', title: translations.verifier },
            attributeName: { type: 'string', title: translations.attributeName },
        },
    };

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.props),
            title: title,
        };
    }
}
