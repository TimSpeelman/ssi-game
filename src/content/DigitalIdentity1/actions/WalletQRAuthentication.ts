import { TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
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
    typeName: 'WalletQRAuthentication',
    title: {
        NL: 'Authenticatie van Wallet via QR',
        EN: 'Authentication of Wallet via QR',
    },
    props: {
        verifier: CommonProps.verifier,
        subject: CommonProps.subject,
        subjectNym: CommonProps.subjectNym,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

export class WalletQRAuthentication extends Action<Props> {
    schema = Schema;

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const props = this.evaluateProps(state);
        const subjectNym: Pseudonym | undefined = props.subjectNym;

        if (!subjectNym) return [];

        const authResult = new AuthenticationResult(this.id + '1', {
            subject: this.defProps.subject,
            identifier: subjectNym.defProps.identifier,
        });
        return [new GainAssetOutcome({ actorId: this.defProps.verifier, asset: authResult })];
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
            to_mode: 'selfie',
            title: {
                NL: 'Authenticatie van wallet (pseudoniem) via QR',
                EN: 'Authentication of wallet (pseudonym) via QR',
            },
            sub: {
                NL: '',
                EN: '',
            },
            long: {
                NL: format(
                    //
                    (s) =>
                        `${s.subject} scant QR van ${s.verifier} waarna ${s.verifier}` +
                        ` de wallet van ${s.subject2} authenticeert.`,
                    {
                        subject: urlActor(subject, true),
                        subject2: urlActor(subject),
                        verifier: urlActor(verifier),
                    },
                ),
                EN: format(
                    //
                    (s) =>
                        `${s.subject} scans the QR of ${s.verifier} after which ${s.verifier}` +
                        ` authenticates the wallet of ${s.subject2}.`,
                    {
                        subject: urlActor(subject, true),
                        subject2: urlActor(subject),
                        verifier: urlActor(verifier),
                    },
                ),
            },
        };
    }
}

export const WalletQRAuthenticationType = new ActionType(Schema, (id, props) => new WalletQRAuthentication(id, props));
