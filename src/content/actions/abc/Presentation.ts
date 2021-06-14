import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { ActionFormConfig } from '../../../model/view/ActionFormConfig';
import { AttributeKnowledge } from '../../assets/data/abc/AttributeKnowledge';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export interface Props {
    verifierId: string;
    subjectId: string;
    verifierNym: string;
    subjectNym: string;
    attributeName: string;
    attributeValue: string;
    issuerNym: string;
}

export class Presentation extends Action<Props> {
    typeName = 'Presentation';

    static config: ActionFormConfig<keyof Props> = {
        typeName: 'Presentation',
        title: 'Presentatie van Credential',
        fields: {
            verifierId: { type: 'actor', title: 'Verifier' },
            subjectId: { type: 'actor', title: 'Subject' },
            verifierNym: { type: 'string', title: 'Pseudoniem van Verifier' },
            subjectNym: { type: 'string', title: 'Pseudoniem van Subject' },
            issuerNym: { type: 'string', title: 'Pseudoniem van Issuer' },
            attributeName: { type: 'string', title: 'Attribuutnaam' },
            attributeValue: { type: 'string', title: 'Attribuutwaarde' },
        },
    };

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const attr = new AttributeKnowledge(this.id + '1', {
            name: this.props.attributeName,
            issuerId: this.props.issuerNym,
            subjectId: this.props.subjectNym,
            value: this.props.attributeValue,
        });
        return [new GainAssetOutcome({ actorId: this.props.verifierId, asset: attr })];
    }

    describe(state: ScenarioState): ActionDesc {
        const subject = state.props.byActor[this.props.subjectId].actor;
        const verifier = state.props.byActor[this.props.verifierId].actor;
        return {
            id: this.id,
            type: 'Presentation',
            from: subject,
            to: verifier,
            to_mode: 'phone',
            description: `Toon ${this.props.attributeName} credential`,
            sub: `Subject: ${this.props.subjectNym}, Verifier: ${this.props.verifierNym}`,
            long: `${ucFirst(subject.nounPhrase)} toont het ${this.props.attributeName} credential aan ${
                verifier.nounPhrase
            }.`,
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
