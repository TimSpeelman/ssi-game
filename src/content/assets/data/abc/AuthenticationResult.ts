import { translations } from '../../../../intl/dictionaries';
import { Translation } from '../../../../intl/Language';
import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetSchema';

export interface Props extends AssetBaseProps {
    sourceId: string;
    targetId: string;
}

const title: Translation = {
    NL: 'Authenticatieresultaat',
    EN: 'Authentication result',
};
export class AuthenticationResult extends Asset<Props> {
    protected typeName = 'AuthenticationResult';
    protected kindName = 'Data';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'AuthenticationResult',
        title: title,
        fields: {
            sourceId: { type: 'actor', title: translations.subject },
            targetId: { type: 'string', title: translations.identifier },
        },
    };

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.props),
            title: title,
        };
    }
}
