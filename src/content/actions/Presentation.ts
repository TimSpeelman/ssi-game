import { TypeOfActionSchema } from '../../model/content/Action/ActionSchema';
import { ActionType } from '../../model/content/Action/ActionType';
import { Locality } from '../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { Action, BaseSchema, CustomActionDesc } from '../../model/logic/Step/Action';
import { IOutcome } from '../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../model/logic/Step/IValidationResult';
import { ucFirst } from '../../util/util';
import { AttributeKnowledge } from '../assets/AttributeKnowledge';
import { AttributeProof } from '../assets/AttributeProof';
import { Pseudonym } from '../assets/Pseudonym';
import { Wallet } from '../assets/Wallet';
import { CommonProps } from '../common/props';
import { GainAssetOutcome } from '../outcomes/GainAssetOutcome';
import { ValidationResult } from '../validations/ValidationResult';

export const Schema = BaseSchema.extend({
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
        attribute: CommonProps.attributeProof,
        // attributeName: CommonProps.attributeName,
        // attributeValue: CommonProps.attributeValue,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

export class Presentation extends Action<Props> {
    schema = Schema;

    protected getSubjectWallet(state: ScenarioState) {
        const { subject } = this.evaluateProps(state);
        return subject!.assets.find((a) => a instanceof Wallet);
    }

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        const wallet = this.getSubjectWallet(state);
        if (!wallet) {
            return [
                new ValidationResult(false, {
                    NL: 'Subject heeft een wallet nodig om een credential te kunnen presenteren.',
                    EN: 'Subject needs a wallet to present a credential.',
                }),
            ];
        }

        return [];
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const { verifier, attribute } = this.evaluateProps(state);

        if (!attribute) return [];

        const attrProof: AttributeProof = attribute;

        const attr = new AttributeKnowledge(this.id + '1', {
            attributeName: attrProof.defProps.attributeName,
            issuerNym: attrProof.defProps.issuerNym, // TODO FIXME
            subjectNym: this.defProps.subjectNym,
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
            from_nym: subjectNym?.id,
            to: verifier,
            to_nym: verifierNym?.id,
            to_mode: 'phone',
            description: {
                NL: attrProof ? `Toon "${attrProof.defProps.attributeName}" credential` : `Toon  credential`,
                EN: attrProof ? `Present "${attrProof.defProps.attributeName}" credential` : `Show  credential`,
            },
            sub: {
                NL: `Subject: ${subjectNym?.defProps.identifier || '?'}, Verifier: ${
                    verifierNym?.defProps.identifier || '?'
                }`,
                EN: `Subject: ${subjectNym?.defProps.identifier || '?'}, Verifier: ${
                    verifierNym?.defProps.identifier || '?'
                }`,
            },
            long: {
                NL: `${ucFirst(subject.nounPhrase)} toont het "${
                    attrProof?.defProps.attributeName || '?'
                }" credential aan ${verifier.nounPhrase}.`,
                EN: `${ucFirst(subject.nounPhrase)} presents the "${
                    attrProof?.defProps.attributeName || '?'
                }" credential to ${verifier.nounPhrase}.`,
            },
            locality: Locality.REMOTE,
        };
    }
}

export const PresentationType = new ActionType(Schema, (id, props) => new Presentation(id, props));
