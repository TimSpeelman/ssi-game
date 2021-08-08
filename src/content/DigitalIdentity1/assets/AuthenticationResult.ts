import { AssetSchema, TypeOfAssetSchema } from '../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { format } from '../../../util/util';
import { CommonProps } from '../common/props';
import { urlActor } from '../common/util';

const Schema = new AssetSchema({
    typeName: 'AuthenticationResult',
    kindName: 'Data',
    title: {
        NL: 'Authenticatieresultaat',
        EN: 'Authentication result',
    },
    image: { type: 'fa-icon', name: 'user-check' },
    props: {
        subject: CommonProps.subject,
        identifier: CommonProps.identifier,
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

export class AuthenticationResult extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        const { subject, identifier } = this.evaluateProps(state);

        if (!subject) return {};

        return {
            transferrable: false,
            cloneable: true,
            long: {
                NL: format(
                    //
                    (s) =>
                        `Een authenticatieresultaat is de uitkomst van een authenticatieproces.` +
                        ` Het is de kennis dat ${s.subject} met een bepaalde zekerheid (?)` +
                        ` heeft bewezen te horen bij identifier "${s.identifier}".`,
                    {
                        subject: urlActor(subject.actor),
                        identifier: identifier!,
                    },
                ),
                EN: format(
                    //
                    (s) =>
                        `An authentication result is the outcome of the authentication process.` +
                        ` It is the knowledge that ${s.subject}  to a certain level of assurance (?)` +
                        ` has proven to belong to identifier "${s.identifier}".`,
                    {
                        subject: urlActor(subject.actor),
                        identifier: identifier!,
                    },
                ),
            },
            sub: {
                NL: `${subject?.actor.nounPhrase} hoort bij identifier "${identifier}".`,
                EN: `${subject?.actor.nounPhrase} belongs to identifier "${identifier}".`,
            },
        };
    }
}

export const AuthenticationResultType = new AssetType(
    Schema,
    (id, props, isInitial) => new AuthenticationResult(id, props, isInitial),
);
