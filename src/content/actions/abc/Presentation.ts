import { Action } from '../../../model/game/Action';
import { IOutcome } from '../../../model/game/IOutcome';
import { ActionFormConfig } from '../../../model/view/ActionFormConfig';
import { ScenarioStateDescription } from '../../../model/view/ScenarioStateDescription';
import { AttributeKnowledge } from '../../assets/data/abc/AttributeKnowledge';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';
import { InteractionDescription } from '../InteractionDescription';

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
        create: (id, d) => new Presentation(id, d),
    };

    validatePreConditions(state: ScenarioStateDescription): string[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioStateDescription): IOutcome[] {
        const attr: AttributeKnowledge = {
            kind: 'data',
            type: 'attribute-knowledge',
            name: this.props.attributeName,
            issuerId: this.props.issuerNym,
            subjectId: this.props.subjectNym,
            value: this.props.attributeValue,
        };
        return [new GainAssetOutcome({ actorId: this.props.verifierId, asset: attr })];
    }

    describe(state: ScenarioStateDescription): InteractionDescription {
        const subject = state.actors[this.props.subjectId].actor;
        const verifier = state.actors[this.props.verifierId].actor;
        return {
            id: this.id,
            type: 'Presentation',
            from: verifier,
            to: subject,
            to_mode: 'phone',
            description: `Toon ${this.props.attributeName} credential`,
            sub: `Subject: ${this.props.subjectNym}, Verifier: ${this.props.verifierNym}`,
            long: `${ucFirst(subject.nounPhrase)} toont het ${this.props.attributeName} credential aan ${
                verifier.name
            }.`,
        };
    }
}

function assert(t: boolean, msg: string) {
    if (!t) throw new Error('Assertion Failed: ' + msg);
}

function ucFirst(str: string) {
    return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}