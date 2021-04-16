import { AuthenticationResult } from '../../asset/data/abc/AuthenticationResult';
import { FormConfig } from '../../FormConfig';
import { GainAssetOutcome } from '../../outcome/GainAssetOutcome';
import { IOutcome } from '../../outcome/IOutcome';
import { ScenarioStateDescription } from '../../scenario/Scenario';
import { IAction } from '../IAction';
import { InteractionDescription } from '../InteractionDescription';

export interface Props {
    verifierId: string;
    humanSubjectId: string;
    dataSubjectId: string;
}

export class WalletQRAuthentication implements IAction {
    static config: FormConfig<keyof Props> = {
        title: 'Authenticatie van Wallet via QR',
        fields: {
            verifierId: { type: 'actor', title: 'Verifier' },
            humanSubjectId: { type: 'actor', title: 'Subject' },
            dataSubjectId: { type: 'string', title: 'Pseudoniem van Subject' },
        },
        create: (id, d) => new WalletQRAuthentication(id, d),
    };

    constructor(readonly id: string, readonly props: Props) {}

    validatePreConditions(state: ScenarioStateDescription): string[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioStateDescription): IOutcome[] {
        const authResult: AuthenticationResult = {
            kind: 'data',
            type: 'authentication-result',
            sourceId: this.props.humanSubjectId,
            targetId: this.props.dataSubjectId,
        };
        return [new GainAssetOutcome({ actorId: this.props.verifierId, asset: authResult })];
    }

    describe(state: ScenarioStateDescription): InteractionDescription {
        const subject = state.actors[this.props.humanSubjectId].actor;
        const verifier = state.actors[this.props.verifierId].actor;
        return {
            id: this.id,
            type: 'WalletQRAuthentication',
            from: verifier,
            to: subject,
            to_mode: 'selfie',
            description: 'Authenticatie van wallet (pseudoniem) via QR',
            sub: '..',
            long: `${ucFirst(subject.nounPhrase)} scant QR van ${verifier.name} waarna ${verifier.name} de wallet van ${
                subject.name
            } authenticeert.`,
        };
    }
}

function assert(t: boolean, msg: string) {
    if (!t) throw new Error('Assertion Failed: ' + msg);
}

function ucFirst(str: string) {
    return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}
