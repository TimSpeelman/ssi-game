import { translations } from '../../../intl/dictionaries';
import { Language } from '../../../intl/Language';
import { ActionSchema, TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { ActorProp } from '../../../model/content/Common/Prop/ActorProp';
import { AssetProp } from '../../../model/content/Common/Prop/AssetProp';
import { StringProp } from '../../../model/content/Common/Prop/StringProp';
import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { Consent } from '../../assets/data/abc/Consent';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export const PresentationConsentSchema = new ActionSchema({
    typeName: 'PresentationConsent',
    title: {
        [Language.NL]: 'Toestemming voor Presentatie',
        [Language.EN]: 'Consent for Presentation',
    },
    props: {
        verifier: new ActorProp('verifier', { title: translations.verifier }),
        subject: new ActorProp('subject', { title: translations.subject }),
        verifierNym: new AssetProp('verifierNym', {
            title: translations.verifierPseudonym,
            dependsOn: ['issuer'],
            filter: (a, data) => a.asset.type === 'Wallet' && a.ownerId === data.issuer, // TODO ownerID
            autoFill: true,
        }),
        subjectNym: new AssetProp('subjectNym', {
            title: translations.subjectPseudonym,
            dependsOn: ['subject'],
            filter: (a, data) => a.asset.type === 'Wallet' && a.ownerId === data.subject, // TODO ownerID
            autoFill: true,
        }),
        attributeName: new StringProp('attributeName', { title: translations.attributeName }),
    },
});

export type Props = TypeOfActionSchema<typeof PresentationConsentSchema>;

export class PresentationConsent extends Action<Props> {
    typeName = 'PresentationConsent';

    schema = PresentationConsentSchema;

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

function assert(t: boolean, msg: string) {
    if (!t) throw new Error('Assertion Failed: ' + msg);
}

function ucFirst(str: string) {
    return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}
export const PresentationConsentType = new ActionType(
    PresentationConsentSchema,
    (id, props) => new PresentationConsent(id, props),
);
