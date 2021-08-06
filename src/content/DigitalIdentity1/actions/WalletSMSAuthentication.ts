import { TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, BaseSchema, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { ucFirst } from '../../../util/util';
import { AuthenticationResult } from '../assets/AuthenticationResult';
import { Pseudonym } from '../assets/Pseudonym';
import { CommonProps } from '../common/props';
import { GainAssetOutcome } from '../outcomes/GainAssetOutcome';

export const Schema = BaseSchema.extend({
    typeName: 'WalletSMSAuthentication',
    title: {
        NL: 'Authenticatie van Wallet via SMS',
        EN: 'Authenticatie of Wallet via SMS',
    },
    props: {
        verifier: CommonProps.verifier,
        subject: CommonProps.subject,
        subjectNym: CommonProps.subjectNym,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

export class WalletSMSAuthentication extends Action<Props> {
    schema = Schema;

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const props = this.evaluateProps(state);
        const subjectNym: Pseudonym | undefined = props.subjectNym;

        if (!subjectNym) return [];

        const authResult = new AuthenticationResult(this.id + '1', {
            subject: this.defProps.subject,
            identifier: subjectNym.defProps.identifier,
        });
        // const phoneNumber = new AttributeKnowledge(this.id + '2', {
        //     subject: this.defProps.subject,
        //     attributeName: 'telefoonnummer',
        //     attributeValue: '06123456789',
        //     issuer: '',
        // });
        return [
            new GainAssetOutcome({ actorId: this.defProps.verifier, asset: authResult }),
            // new GainAssetOutcome({ actorId: this.defProps.verifier, asset: phoneNumber }),
        ];
    }

    _describe(state: ScenarioState): CustomActionDesc {
        const props = this.evaluateProps(state);

        const subject = state.props.byActor[this.defProps.subject].actor;
        const verifier = state.props.byActor[this.defProps.verifier].actor;

        const subjectNym: Pseudonym | undefined = props.subjectNym;
        return {
            to: subject,
            to_nym: subjectNym?.id,
            from: verifier,

            title: {
                NL: 'Authenticatie van wallet (pseudoniem) via SMS',
                EN: 'Authentication of wallet (pseudonym) via SMS',
            },
            sub: {
                NL: '',
                EN: '',
            },
            long: {
                NL: `${ucFirst(verifier.nounPhrase)} authenticeert de wallet van ${subject.nounPhrase} door ${
                    subject.isMale ? 'hem' : 'haar'
                } een unieke code per SMS te sturen.`,

                EN: `${ucFirst(verifier.nounPhrase)} authenticates the wallet of ${subject.nounPhrase} by sending ${
                    subject.isMale ? 'him' : 'her'
                } a unique code via SMS.`,
            },
            locality: Locality.AT_FROM, // TODO not neccesarily (but in municipality onboarding, yes)
        };
    }
}

export const WalletSMSAuthenticationType = new ActionType(
    Schema,
    (id, props) => new WalletSMSAuthentication(id, props),
);
