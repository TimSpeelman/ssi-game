import { ActionSchema, TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { ucFirst } from '../../../util/util';
import { AttributeKnowledge } from '../../assets/data/abc/AttributeKnowledge';
import { AttributeProof } from '../../assets/data/abc/AttributeProof';
import { Pseudonym } from '../../assets/data/abc/Pseudonym';
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
        attribute: CommonProps.attributeProof,
        // attributeName: CommonProps.attributeName,
        // attributeValue: CommonProps.attributeValue,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

export class Presentation extends Action<Props> {
    schema = Schema;

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const { verifier, attribute } = this.evaluateProps(state);

        if (!attribute) return [];

        const attrProof: AttributeProof = attribute;

        const attr = new AttributeKnowledge(this.id + '1', {
            attributeName: attrProof.defProps.attributeName,
            issuer: this.defProps.issuerNym,
            subject: this.defProps.subjectNym,
            attributeValue: attrProof.defProps.attributeValue,
        });
        return [new GainAssetOutcome({ actorId: verifier!.actor.id, asset: attr })];
    }

    _describe(state: ScenarioState): CustomActionDesc {
        const props = this.evaluateProps(state);
        const subject = props.subject!.actor;
        const verifier = props.verifier!.actor;

        const subjectNym: Pseudonym | undefined = props.subjectNym;
        const verifierNym: Pseudonym | undefined = props.verifierNym;
        const attrProof: AttributeProof | undefined = props.attribute;

        return {
            from: subject,
            from_nym: subjectNym?.defProps.image,
            to: verifier,
            to_nym: verifierNym?.defProps.image,
            to_mode: 'phone',
            description: {
                NL: `Toon "${attrProof?.defProps.attributeName}" credential`,
                EN: `Present "${attrProof?.defProps.attributeName}" credential`,
            },
            sub: {
                NL: `Subject: ${subjectNym?.defProps.identifier}, Verifier: ${verifierNym?.defProps.identifier}`,
                EN: `Subject: ${subjectNym?.defProps.identifier}, Verifier: ${verifierNym?.defProps.identifier}`,
            },
            long: {
                NL: `${ucFirst(subject.nounPhrase)} toont het "${attrProof?.defProps.attributeName}" credential aan ${
                    verifier.nounPhrase
                }.`,
                EN: `${ucFirst(subject.nounPhrase)} presents the "${attrProof?.defProps.attributeName}" credential to ${
                    verifier.nounPhrase
                }.`,
            },
            locality: Locality.REMOTE,
        };
    }
}

export const PresentationType = new ActionType(Schema, (id, props) => new Presentation(id, props));
