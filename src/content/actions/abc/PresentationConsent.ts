import { Language } from '../../../intl/Language';
import { ActionSchema, TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { ucFirst } from '../../../util/util';
import { Consent } from '../../assets/data/abc/Consent';
import { CommonProps } from '../../common/props';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export const Schema = new ActionSchema({
    typeName: 'PresentationConsent',
    title: {
        [Language.NL]: 'Toestemming voor Presentatie',
        [Language.EN]: 'Consent for Presentation',
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

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const props = this.evaluateProps(state);

        const consent = new Consent(this.id + '1', {
            attributeName: this.defProps.attributeName,
            verifier: props.verifier.actor.id,
            subject: this.defProps.subjectNym,
        });
        return [new GainAssetOutcome({ actorId: props.verifier.actor.id, asset: consent })];
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
                [Language.NL]: `Geef toestemming om ${this.defProps.attributeName} credential te gebruiken`,
                [Language.EN]: `Consent to use ${this.defProps.attributeName} credential`,
            },
            sub: {
                [Language.NL]: `Subject: ${this.defProps.subjectNym}, Verifier: ${this.defProps.verifierNym}`,
                [Language.EN]: `Subject: ${this.defProps.subjectNym}, Verifier: ${this.defProps.verifierNym}`,
            },
            long: {
                [Language.NL]: `${ucFirst(subject.nounPhrase)} geeft ${
                    verifier.nounPhrase
                } toestemming om het attribuut ${this.defProps.attributeName} te gebruiken.`,
                [Language.EN]: `${ucFirst(subject.nounPhrase)} consents to ${verifier.nounPhrase} using the attribute ${
                    this.defProps.attributeName
                }.`,
            },
            locality: Locality.REMOTE,
        };
    }
}

export const PresentationConsentType = new ActionType(Schema, (id, props) => new PresentationConsent(id, props));
