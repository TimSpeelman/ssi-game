import { Translation } from '../../../../intl/Language';
import { AssetSchema, TypeOfAssetSchema } from '../../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { CommonProps } from '../../../common/props';

const title: Translation = {
    NL: 'Authenticatieresultaat',
    EN: 'Authentication result',
};

const Schema = new AssetSchema({
    typeName: 'AuthenticationResult',
    title: {
        NL: 'Authenticatieresultaat',
        EN: 'Authentication result',
    },
    props: {
        subject: CommonProps.subject,
        identifier: CommonProps.identifier,
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

export class AuthenticationResult extends Asset<Props> {
    protected typeName = 'AuthenticationResult';
    protected kindName = 'Data';

    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.defProps),
            title: title,
        };
    }
}

export const AuthenticationResultType = new AssetType(
    Schema,
    (id, props, isInitial) => new AuthenticationResult(id, props, isInitial),
);
