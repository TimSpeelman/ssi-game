import { Action } from '../../../model/game/Action';
import { IOutcome } from '../../../model/game/IOutcome';
import { ActionFormConfig } from '../../../model/view/ActionFormConfig';
import { ScenarioStateDescription } from '../../../model/view/ScenarioStateDescription';
import { AuthenticationResult } from '../../assets/data/abc/AuthenticationResult';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';
import { InteractionDescription } from '../InteractionDescription';

export interface Props {
    verifierId: string;
    humanSubjectId: string;
    dataSubjectId: string;
}

export class WalletQRAuthentication extends Action<Props> {
    typeName = 'WalletQRAuthentication';

    static config: ActionFormConfig<keyof Props> = {
        title: 'Authenticatie van Wallet via QR',
        fields: {
            verifierId: { type: 'actor', title: 'Verifier' },
            humanSubjectId: { type: 'actor', title: 'Subject' },
            dataSubjectId: { type: 'string', title: 'Pseudoniem van Subject' },
        },
        create: (id, d) => new WalletQRAuthentication(id, d),
    };

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
