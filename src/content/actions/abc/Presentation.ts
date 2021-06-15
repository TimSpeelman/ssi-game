import { translations } from '../../../intl/dictionaries';
import { Language } from '../../../intl/Language';
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
        title: {
            [Language.NL]: 'Presentatie van Credential',
            [Language.EN]: 'Presentation of Credential',
        },
        fields: {
            verifierId: { type: 'actor', title: translations.verifier },
            subjectId: { type: 'actor', title: translations.subject },
            verifierNym: { type: 'string', title: translations.verifierPseudonym },
            subjectNym: { type: 'string', title: translations.subjectPseudonym },
            issuerNym: { type: 'string', title: translations.issuerPseudonym },
            attributeName: { type: 'string', title: translations.attributeName },
            attributeValue: { type: 'string', title: translations.attributeValue },
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
            description: {
                [Language.NL]: `Toon ${this.props.attributeName} credential`,
                [Language.EN]: `Present ${this.props.attributeName} credential`,
            },
            sub: {
                [Language.NL]: `Subject: ${this.props.subjectNym}, Verifier: ${this.props.verifierNym}`,
                [Language.EN]: `Subject: ${this.props.subjectNym}, Verifier: ${this.props.verifierNym}`,
            },
            long: {
                [Language.NL]: `${ucFirst(subject.nounPhrase)} toont het ${this.props.attributeName} credential aan ${
                    verifier.nounPhrase
                }.`,
                [Language.EN]: `${ucFirst(subject.nounPhrase)} presents the ${this.props.attributeName} credential to ${
                    verifier.nounPhrase
                }.`,
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
