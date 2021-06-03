import { AssetDesc } from '../../../../model/description/Asset/AssetDesc';
import { Asset } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetFormConfig';

export interface Props {
    sourceId: string;
    targetId: string;
}

export class AuthenticationResult extends Asset<Props> {
    protected typeName = 'AuthenticationResult';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'AuthenticationResult',
        title: 'Authenticatieresultaat',
        fields: {
            sourceId: { type: 'actor', title: 'Subject' },
            targetId: { type: 'string', title: 'Identifier' },
        },
    };

    describe(state: ScenarioState): AssetDesc {
        return {
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Authenticatieresultaat',
        };
    }
}
