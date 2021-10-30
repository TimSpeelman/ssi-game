import { ActorProp } from '../../../model/content/Common/Props/ActorProp';
import { AssetProp } from '../../../model/content/Common/Props/AssetProp';
import { StringProp } from '../../../model/content/Common/Props/StringProp';
import { translations } from '../intl/dictionaries';

export const CommonProps = {
    issuer: new ActorProp({ title: translations.issuer }),
    subject: new ActorProp({
        title: translations.subject,
        required: {
            NL: 'Een subject is vereist.',
            EN: 'A subject is required.',
        },
    }),
    verifier: new ActorProp({ title: translations.verifier }),
    issuerNym: new AssetProp({
        title: translations.issuerPseudonym,
        dependsOn: ['issuer'],
        filter: (a, data) => a.asset.type === 'Pseudonym' && a.ownerId === data.issuer,
        required: {
            NL: 'Een issuerpseudoniem is vereist.',
            EN: 'An issuer pseudonym is required.',
        },
        autoFill: true,
    }),
    anyIssuerNym: new AssetProp({
        title: translations.issuerPseudonym,
        filter: (a, data) => a.asset.type === 'Pseudonym',
        required: {
            NL: 'Een issuerpseudoniem is vereist.',
            EN: 'An issuer pseudonym is required.',
        },
    }),
    subjectNym: new AssetProp({
        title: translations.subjectPseudonym,
        dependsOn: ['subject'],
        filter: (a, data) => a.asset.type === 'Pseudonym' && a.ownerId === data.subject,
        required: {
            NL: 'Een subjectpseudoniem is vereist.',
            EN: 'A subject pseudonym is required.',
        },
        autoFill: true,
    }),
    anySubjectNym: new AssetProp({
        title: translations.subjectPseudonym,
        filter: (a, data) => a.asset.type === 'Pseudonym',
        required: {
            NL: 'Een subjectpseudoniem is vereist.',
            EN: 'A subject pseudonym is required.',
        },
    }),
    subjectPassport: new AssetProp({
        title: translations.subjectPassport,
        dependsOn: ['subject'],
        filter: (a, data) => a.asset.type === 'GovPassport' && a.ownerId === data.subject,
        required: {
            NL: 'Een paspoort is vereist.',
            EN: 'A passport is required.',
        },
        autoFill: true,
    }),
    verifierNym: new AssetProp({
        title: translations.verifierPseudonym,
        dependsOn: ['verifier'],
        filter: (a, data) => a.asset.type === 'Pseudonym' && a.ownerId === data.verifier,
        required: {
            NL: 'Een verifierpseudoniem is vereist.',
            EN: 'A verifier pseudonym is required.',
        },
        autoFill: true,
    }),
    anyVerifierNym: new AssetProp({
        title: translations.verifierPseudonym,
        filter: (a, data) => a.asset.type === 'Pseudonym',
        required: {
            NL: 'Een verifierpseudoniem is vereist.',
            EN: 'A verifier pseudonym is required.',
        },
    }),
    attributeName: new StringProp({ title: translations.attributeName }),
    attributeValue: new StringProp({ title: translations.attributeValue }),
    credential: new AssetProp({
        title: translations.attribute,
        dependsOn: ['subject'],
        filter: (a, data) => a.asset.type === 'Credential' && a.ownerId === data.subject,
        required: {
            NL: 'Een credential is vereist.',
            EN: 'A credential is required.',
        },
    }),
    identifier: new StringProp({ title: translations.identifier }),
    description: new StringProp({ title: translations.description }),
};
