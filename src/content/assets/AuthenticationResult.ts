import { AssetSchema, TypeOfAssetSchema } from '../../model/content/Asset/AssetSchema';
import { AssetType } from '../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../model/logic/Asset/Asset';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { CommonProps } from '../common/props';

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
        const props = this.evaluateProps(state);
        return {
            transferrable: false,
            cloneable: true,
            long: {
                NL:
                    'Een authenticatieresultaat is de uitkomst van een authenticatieproces. Het is de kennis dat ' +
                    `${props.subject?.actor.nounPhrase} met een bepaalde zekerheid (?) heeft bewezen te horen bij identifier "${props.identifier}".`,
                EN:
                    'An authentication result is the outcome of the authentication process. It is the knowledge that ' +
                    `${props.subject?.actor.nounPhrase} to a certain level of assurance (?) has proven to beelong to identifier "${props.identifier}".`,
            },
            sub: {
                NL: `${props.subject?.actor.nounPhrase} hoort bij identifier "${props.identifier}".`,
                EN: `${props.subject?.actor.nounPhrase} belongs to identifier "${props.identifier}".`,
            },
            image: { type: 'fa-icon', name: 'user-check' },
        };
    }
}

export const AuthenticationResultType = new AssetType(
    Schema,
    (id, props, isInitial) => new AuthenticationResult(id, props, isInitial),
);
