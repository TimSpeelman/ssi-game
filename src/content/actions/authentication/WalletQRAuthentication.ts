import { ActionSchema, TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { ucFirst } from '../../../util/util';
import { AuthenticationResult } from '../../assets/data/abc/AuthenticationResult';
import { CommonProps } from '../../common/props';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export const Schema = new ActionSchema({
    typeName: 'WalletQRAuthentication',
    title: {
        NL: 'Authenticatie van Wallet via QR',
        EN: 'Authentication of Wallet via QR',
    },
    props: {
        verifier: CommonProps.verifier,
        subject: CommonProps.subject,
        identifier: CommonProps.identifier,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

export class WalletQRAuthentication extends Action<Props> {
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

    _describe(state: ScenarioState): CustomActionDesc {
        const subject = state.props.byActor[this.defProps.subject].actor;
        const verifier = state.props.byActor[this.defProps.verifier].actor;
        return {
            from: verifier,
            to: subject,
            to_mode: 'selfie',
            description: {
                NL: 'Authenticatie van wallet (pseudoniem) via QR',
                EN: 'Authentication of wallet (pseudonym) via QR',
            },
            sub: {
                NL: '',
                EN: '',
            },
            long: {
                NL: `${ucFirst(subject.nounPhrase)} scant QR van ${verifier.nounPhrase} waarna ${
                    verifier.nounPhrase
                } de wallet van ${subject.nounPhrase} authenticeert.`,
                EN: `${ucFirst(subject.nounPhrase)} scans QR code of ${verifier.nounPhrase} after which ${
                    verifier.nounPhrase
                } authenticates the wallet of ${subject.nounPhrase}.`,
            },
            locality: Locality.REMOTE,
        };
    }
}

export const WalletQRAuthenticationType = new ActionType(Schema, (id, props) => new WalletQRAuthentication(id, props));
