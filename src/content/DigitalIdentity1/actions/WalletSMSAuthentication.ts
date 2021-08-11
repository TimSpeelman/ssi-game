import { TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, BaseSchema, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { format } from '../../../util/util';
import { AuthenticationResult } from '../assets/AuthenticationResult';
import { Pseudonym } from '../assets/Pseudonym';
import { CommonProps } from '../common/props';
import { urlActor } from '../common/util';
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

        const subject = props.subject!.actor;
        const verifier = props.verifier!.actor;
        const subjectNym: Pseudonym | undefined = props.subjectNym;

        const base = {
            from: verifier,
            to: subject,
        };

        if (!subjectNym) {
            return base;
        }

        return {
            ...base,
            to_nym: subjectNym?.id,
            long: {
                NL: format(
                    //
                    (s) =>
                        `${s.verifier} authenticeert de wallet van ${s.subject}` +
                        ` door ${s.himHer} een unieke code per SMS te sturen.`,
                    {
                        verifier: urlActor(verifier, true),
                        subject: urlActor(subject),
                        himHer: subject.isMale ? 'hem' : 'haar',
                    },
                ),
                EN: format(
                    //
                    (s) =>
                        `${s.verifier} authenticates the wallet of ${s.subject}` +
                        ` by sending ${s.himHer} a unique code per SMS.`,
                    {
                        verifier: urlActor(verifier, true),
                        subject: urlActor(subject),
                        himHer: subject.isMale ? 'hem' : 'haar',
                    },
                ),
            },
            locality: Locality.AT_FROM, // TODO not neccesarily (but in municipality onboarding, yes)
        };
    }
}

export const WalletSMSAuthenticationType = new ActionType(
    Schema,
    (id, props) => new WalletSMSAuthentication(id, props),
);
