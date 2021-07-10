import { Language } from '../../../intl/Language';
import { ActionSchema, TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { AttributeKnowledge } from '../../assets/data/abc/AttributeKnowledge';
import { CommonProps } from '../../common/props';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export const Schema = new ActionSchema({
    typeName: 'Presentation',
    title: {
        [Language.NL]: 'Presentatie van Credential',
        [Language.EN]: 'Presentation of Credential',
    },
    props: {
        verifier: CommonProps.verifier,
        verifierNym: CommonProps.verifierNym,
        subject: CommonProps.subject,
        subjectNym: CommonProps.subjectNym,
        issuerNym: CommonProps.issuerNym,
        attributeName: CommonProps.attributeName,
        attributeValue: CommonProps.attributeValue,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

export class Presentation extends Action<Props> {
    typeName = 'Presentation';

    schema = Schema;

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const { verifier } = this.evaluateProps(state);

        const attr = new AttributeKnowledge(this.id + '1', {
            attributeName: this.defProps.attributeName,
            issuer: this.defProps.issuerNym,
            subject: this.defProps.subjectNym,
            attributeValue: this.defProps.attributeValue,
        });
        return [new GainAssetOutcome({ actorId: verifier.actor.id, asset: attr })];
    }

    describe(state: ScenarioState): ActionDesc {
        const props = this.evaluateProps(state);
        const subject = props.subject.actor;
        const verifier = props.verifier.actor;
        return {
            id: this.id,
            type: this.typeName,
            from: subject,
            to: verifier,
            to_mode: 'phone',
            description: {
                [Language.NL]: `Toon ${this.defProps.attributeName} credential`,
                [Language.EN]: `Present ${this.defProps.attributeName} credential`,
            },
            sub: {
                [Language.NL]: `Subject: ${this.defProps.subjectNym}, Verifier: ${this.defProps.verifierNym}`,
                [Language.EN]: `Subject: ${this.defProps.subjectNym}, Verifier: ${this.defProps.verifierNym}`,
            },
            long: {
                [Language.NL]: `${ucFirst(subject.nounPhrase)} toont het ${
                    this.defProps.attributeName
                } credential aan ${verifier.nounPhrase}.`,
                [Language.EN]: `${ucFirst(subject.nounPhrase)} presents the ${
                    this.defProps.attributeName
                } credential to ${verifier.nounPhrase}.`,
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
export const PresentationType = new ActionType(Schema, (id, props) => new Presentation(id, props));
