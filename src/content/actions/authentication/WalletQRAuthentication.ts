import { Action } from '../../../model/game/Action/Action';
import { IOutcome } from '../../../model/game/Action/IOutcome';
import { IValidationResult } from '../../../model/game/Action/IValidationResult';
import { ScenarioState } from '../../../model/game/Scenario/ScenarioState';
import { ActionFormConfig } from '../../../model/view/ActionFormConfig';
import { AuthenticationResult } from '../../assets/data/abc/AuthenticationResult';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';
import { InteractionDescription, Locality } from '../InteractionDescription';

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

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const authResult: AuthenticationResult = {
            kind: 'data',
            type: 'authentication-result',
            id: this.id + '-1',

            sourceId: this.props.humanSubjectId,
            targetId: this.props.dataSubjectId,
        };
        return [new GainAssetOutcome({ actorId: this.props.verifierId, asset: authResult })];
    }

    describe(state: ScenarioState): InteractionDescription {
        const subject = state.props.byActor[this.props.humanSubjectId].actor;
        const verifier = state.props.byActor[this.props.verifierId].actor;
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
