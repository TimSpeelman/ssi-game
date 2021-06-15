import { Language } from '../../../intl/Language';
import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { ActionFormConfig } from '../../../model/view/ActionFormConfig';
import { AuthenticationResult } from '../../assets/data/abc/AuthenticationResult';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export interface Props {
    verifierId: string;
    humanSubjectId: string;
    dataSubjectId: string;
}

export class WalletQRAuthentication extends Action<Props> {
    typeName = 'WalletQRAuthentication';

    static config: ActionFormConfig<keyof Props> = {
        typeName: 'WalletQRAuthentication',
        title: 'Authenticatie van Wallet via QR',
        fields: {
            verifierId: { type: 'actor', title: 'Verifier' },
            humanSubjectId: { type: 'actor', title: 'Subject' },
            dataSubjectId: { type: 'string', title: 'Pseudoniem van Subject' },
        },
    };

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const authResult = new AuthenticationResult(this.id + '1', {
            sourceId: this.props.humanSubjectId,
            targetId: this.props.dataSubjectId,
        });
        return [new GainAssetOutcome({ actorId: this.props.verifierId, asset: authResult })];
    }

    describe(state: ScenarioState): ActionDesc {
        const subject = state.props.byActor[this.props.humanSubjectId].actor;
        const verifier = state.props.byActor[this.props.verifierId].actor;
        return {
            id: this.id,
            type: 'WalletQRAuthentication',
            from: verifier,
            to: subject,
            to_mode: 'selfie',
            description: {
                [Language.NL]: 'Authenticatie van wallet (pseudoniem) via QR',
                [Language.EN]: 'Authenticatie van wallet (pseudoniem) via QR',
            },
            sub: '..',
            long: `${ucFirst(subject.nounPhrase)} scant QR van ${verifier.nounPhrase} waarna ${
                verifier.nounPhrase
            } de wallet van ${subject.nounPhrase} authenticeert.`,
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
