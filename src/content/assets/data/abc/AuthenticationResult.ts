import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    sourceId: string;
    targetId: string;
}

export class AuthenticationResult extends Asset<Props> {
    protected typeName = 'AuthenticationResult';
    protected kindName = 'Data';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'AuthenticationResult',
        title: 'Authenticatieresultaat',
        fields: {
            sourceId: { type: 'actor', title: 'Subject' },
            targetId: { type: 'string', title: 'Identifier' },
        },
    };

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.props),
            title: 'Authenticatieresultaat',
        };
    }
}
