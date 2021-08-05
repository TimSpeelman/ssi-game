import { TypeOfActionSchema } from '../../model/content/Action/ActionSchema';
import { ActionType } from '../../model/content/Action/ActionType';
import { Locality } from '../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { Action, BaseSchema, CustomActionDesc } from '../../model/logic/Step/Action';
import { IOutcome } from '../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../model/logic/Step/IValidationResult';
import { ucFirst } from '../../util/util';
import { Consent } from '../assets/Consent';
import { Pseudonym } from '../assets/Pseudonym';
import { Wallet } from '../assets/Wallet';
import { CommonProps } from '../common/props';
import { GainAssetOutcome } from '../outcomes/GainAssetOutcome';
import { ValidationResult } from '../validations/ValidationResult';

export const Schema = BaseSchema.extend({
    typeName: 'PresentationConsent',
    title: {
        NL: 'Toestemming voor Presentatie',
        EN: 'Consent for Presentation',
    },
    props: {
        verifier: CommonProps.verifier,
        verifierNym: CommonProps.verifierNym,
        subject: CommonProps.subject,
        subjectNym: CommonProps.subjectNym,
        attributeName: CommonProps.attributeName,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

export class PresentationConsent extends Action<Props> {
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
                    NL: 'Subject heeft een wallet nodig om toestemming voor presentatie te kunnen geven.',
                    EN: 'Subject needs a wallet to constent to a presentation of a credential.',
                }),
            ];
        }

        return [];
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const props = this.evaluateProps(state);

        const consent = new Consent(this.id + '1', {
            attributeName: this.defProps.attributeName,
            verifier: props.verifier!.actor.id,
            subject: this.defProps.subjectNym,
        });
        return [new GainAssetOutcome({ actorId: props.verifier!.actor.id, asset: consent })];
    }

    _describe(state: ScenarioState): CustomActionDesc {
        const props = this.evaluateProps(state);

        const subject = props.subject!.actor;
        const verifier = props.verifier!.actor;

        const subjectNym: Pseudonym | undefined = props.subjectNym;
        const verifierNym: Pseudonym | undefined = props.verifierNym;

        return {
            from: subject,
            from_nym: subjectNym?.id,
            to: verifier,
            to_nym: verifierNym?.id,
            to_mode: 'phone',
            description: {
                NL: `Geef toestemming om ${this.defProps.attributeName} credential te gebruiken`,
                EN: `Consent to use ${this.defProps.attributeName} credential`,
            },
            sub: {
                NL: `Subject: ${subjectNym?.defProps.identifier}, Verifier: ${verifierNym?.defProps.identifier}`,
                EN: `Subject: ${subjectNym?.defProps.identifier}, Verifier: ${verifierNym?.defProps.identifier}`,
            },
            long: {
                NL: `${ucFirst(subject.nounPhrase)} geeft ${verifier.nounPhrase} toestemming om het attribuut ${
                    this.defProps.attributeName
                } te gebruiken.`,
                EN: `${ucFirst(subject.nounPhrase)} consents to ${verifier.nounPhrase} using the attribute ${
                    this.defProps.attributeName
                }.`,
            },
            locality: Locality.REMOTE,
        };
    }
}

export const PresentationConsentType = new ActionType(Schema, (id, props) => new PresentationConsent(id, props));
