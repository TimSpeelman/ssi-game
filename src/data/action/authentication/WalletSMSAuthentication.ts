import { AttributeKnowledge } from '../../asset/data/abc/AttributeKnowledge';
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

export class WalletSMSAuthentication implements IAction {
    static config: FormConfig<keyof Props> = {
        title: 'Authenticatie van Wallet via SMS',
        fields: {
            verifierId: { type: 'actor', title: 'Verifier' },
            humanSubjectId: { type: 'actor', title: 'Subject' },
            dataSubjectId: { type: 'string', title: 'Pseudoniem van Subject' },
        },
        create: (id, d) => new WalletSMSAuthentication(id, d),
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

    describe(state: ScenarioStateDescription): InteractionDescription {
        const subject = state.actors[this.props.humanSubjectId].actor;
        const verifier = state.actors[this.props.verifierId].actor;
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
        };
    }
}

function assert(t: boolean, msg: string) {
    if (!t) throw new Error('Assertion Failed: ' + msg);
}

function ucFirst(str: string) {
    return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}
