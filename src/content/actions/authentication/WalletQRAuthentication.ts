import { translations } from '../../../intl/dictionaries';
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
        title: {
            [Language.NL]: 'Authenticatie van Wallet via QR',
            [Language.EN]: 'Authentication of Wallet via QR',
        },
        fields: {
            verifierId: { type: 'actor', title: translations.verifier },
            humanSubjectId: { type: 'actor', title: translations.subject },
            dataSubjectId: { type: 'string', title: translations.subjectPseudonym },
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
