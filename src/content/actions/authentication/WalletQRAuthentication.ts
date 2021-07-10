import { Language } from '../../../intl/Language';
import { ActionSchema, TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { AuthenticationResult } from '../../assets/data/abc/AuthenticationResult';
import { CommonProps } from '../../common/props';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export const Schema = new ActionSchema({
    typeName: 'WalletQRAuthentication',
    title: {
        [Language.NL]: 'Authenticatie van Wallet via QR',
        [Language.EN]: 'Authentication of Wallet via QR',
    },
    props: {
        verifier: CommonProps.verifier,
        subject: CommonProps.subject,
        identifier: CommonProps.identifier,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

export class WalletQRAuthentication extends Action<Props> {
    typeName = 'WalletQRAuthentication';

    schema = Schema;

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const authResult = new AuthenticationResult(this.id + '1', {
            subject: this.defProps.subject,
            identifier: this.defProps.identifier,
        });
        return [new GainAssetOutcome({ actorId: this.defProps.verifier, asset: authResult })];
    }

    describe(state: ScenarioState): ActionDesc {
        const subject = state.props.byActor[this.defProps.subject].actor;
        const verifier = state.props.byActor[this.defProps.verifier].actor;
        return {
            id: this.id,
            type: this.typeName,
            from: verifier,
            to: subject,
            to_mode: 'selfie',
            description: {
                [Language.NL]: 'Authenticatie van wallet (pseudoniem) via QR',
                [Language.EN]: 'Authentication of wallet (pseudonym) via QR',
            },
            sub: {
                [Language.NL]: '',
                [Language.EN]: '',
            },
            long: {
                [Language.NL]: `${ucFirst(subject.nounPhrase)} scant QR van ${verifier.nounPhrase} waarna ${
                    verifier.nounPhrase
                } de wallet van ${subject.nounPhrase} authenticeert.`,
                [Language.EN]: `${ucFirst(subject.nounPhrase)} scans QR code of ${verifier.nounPhrase} after which ${
                    verifier.nounPhrase
                } authenticates the wallet of ${subject.nounPhrase}.`,
            },
            locality: Locality.REMOTE,
        };
    }
}

function assert(t: boolean, msg: string) {
    if (!t) throw new Error('Assertion Failed: ' + msg);
}

function ucFirst(str: string) {
    return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}
export const WalletQRAuthenticationType = new ActionType(Schema, (id, props) => new WalletQRAuthentication(id, props));
