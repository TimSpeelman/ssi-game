import { AssetSchema, TypeOfAssetSchema } from '../../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { CommonProps } from '../../../common/props';

const Schema = new AssetSchema({
    typeName: 'AuthenticationResult',
    kindName: 'Data',
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
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.defProps),
            title: this.schema.title,
        };
    }
}

export const AuthenticationResultType = new AssetType(
    Schema,
    (id, props, isInitial) => new AuthenticationResult(id, props, isInitial),
);
