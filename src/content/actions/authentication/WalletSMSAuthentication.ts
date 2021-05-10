import { Action } from '../../../model/game/Action';
import { IOutcome } from '../../../model/game/IOutcome';
import { IValidationResult } from '../../../model/game/IValidationResult';
import { ScenarioState } from '../../../model/game/ScenarioState';
import { ActionFormConfig } from '../../../model/view/ActionFormConfig';
import { AttributeKnowledge } from '../../assets/data/abc/AttributeKnowledge';
import { AuthenticationResult } from '../../assets/data/abc/AuthenticationResult';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';
import { InteractionDescription, Locality } from '../InteractionDescription';

export interface Props {
    verifierId: string;
    humanSubjectId: string;
    dataSubjectId: string;
}

export class WalletSMSAuthentication extends Action<Props> {
    typeName = 'WalletSMSAuthentication';

    static config: ActionFormConfig<keyof Props> = {
        title: 'Authenticatie van Wallet via SMS',
        fields: {
            verifierId: { type: 'actor', title: 'Verifier' },
            humanSubjectId: { type: 'actor', title: 'Subject' },
            dataSubjectId: { type: 'string', title: 'Pseudoniem van Subject' },
        },
        create: (id, d) => new WalletSMSAuthentication(id, d),
    };

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const authResult: AuthenticationResult = {
            kind: 'data',
            type: 'authentication-result',
            sourceId: this.props.humanSubjectId,
            targetId: this.props.dataSubjectId,
        };
        const phoneNumber: AttributeKnowledge = {
            kind: 'data',
            type: 'attribute-knowledge',
            subjectId: this.props.humanSubjectId,
            name: 'telefoonnummer',
            value: '06123456789',
            issuerId: '',
        };
        return [
            new GainAssetOutcome({ actorId: this.props.verifierId, asset: authResult }),
            new GainAssetOutcome({ actorId: this.props.verifierId, asset: phoneNumber }),
        ];
    }

    describe(state: ScenarioState): InteractionDescription {
        const subject = state.props.byActor[this.props.humanSubjectId].actor;
        const verifier = state.props.byActor[this.props.verifierId].actor;
        return {
            id: this.id,
            type: 'WalletSMSAuthentication',
            from: verifier,
            to: subject,
            description: 'Authenticatie van wallet (pseudoniem) via SMS',
            sub: '..',
            long: `${ucFirst(verifier.nounPhrase)} authenticeert de wallet van ${subject.name} door ${
                subject.isMale ? 'hem' : 'haar'
            } een unieke code per SMS te sturen.`,
            locality: Locality.AT_FROM, // TODO not neccesarily (but in municipality onboarding, yes)
        };
    }
}

function assert(t: boolean, msg: string) {
    if (!t) throw new Error('Assertion Failed: ' + msg);
}

function ucFirst(str: string) {
    return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}
