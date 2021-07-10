import { ActionSchema, TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { ucFirst } from '../../../util/util';
import { AttributeKnowledge } from '../../assets/data/abc/AttributeKnowledge';
import { CommonProps } from '../../common/props';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export const Schema = new ActionSchema({
    typeName: 'Presentation',
    title: {
        NL: 'Presentatie van Credential',
        EN: 'Presentation of Credential',
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

    _describe(state: ScenarioState): CustomActionDesc {
        const props = this.evaluateProps(state);
        const subject = props.subject.actor;
        const verifier = props.verifier.actor;
        return {
            from: subject,
            to: verifier,
            to_mode: 'phone',
            description: {
                NL: `Toon ${this.defProps.attributeName} credential`,
                EN: `Present ${this.defProps.attributeName} credential`,
            },
            sub: {
                NL: `Subject: ${this.defProps.subjectNym}, Verifier: ${this.defProps.verifierNym}`,
                EN: `Subject: ${this.defProps.subjectNym}, Verifier: ${this.defProps.verifierNym}`,
            },
            long: {
                NL: `${ucFirst(subject.nounPhrase)} toont het ${this.defProps.attributeName} credential aan ${
                    verifier.nounPhrase
                }.`,
                EN: `${ucFirst(subject.nounPhrase)} presents the ${this.defProps.attributeName} credential to ${
                    verifier.nounPhrase
                }.`,
            },
            locality: Locality.REMOTE,
        };
    }
}

export const PresentationType = new ActionType(Schema, (id, props) => new Presentation(id, props));
