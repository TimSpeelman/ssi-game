import { translations } from '../../intl/dictionaries';
import { ActorProp } from '../../model/content/Common/Prop/ActorProp';
import { AssetProp } from '../../model/content/Common/Prop/AssetProp';
import { StringProp } from '../../model/content/Common/Prop/StringProp';

export const CommonProps = {
    issuer: new ActorProp('issuer', { title: translations.issuer }),
    subject: new ActorProp('subject', { title: translations.subject }),
    verifier: new ActorProp('verifier', { title: translations.verifier }),
    issuerNym: new AssetProp('issuerNym', {
        title: translations.issuerPseudonym,
        dependsOn: ['issuer'],
        filter: (a, data) => a.asset.type === 'Wallet' && a.ownerId === data.issuer,
        autoFill: true,
    }),
    subjectNym: new AssetProp('subjectNym', {
        title: translations.subjectPseudonym,
        dependsOn: ['subject'],
        filter: (a, data) => a.asset.type === 'Wallet' && a.ownerId === data.subject,
        autoFill: true,
    }),
    verifierNym: new AssetProp('verifierNym', {
        title: translations.verifierPseudonym,
        dependsOn: ['verifier'],
        filter: (a, data) => a.asset.type === 'Wallet' && a.ownerId === data.verifier,
        autoFill: true,
    }),
    attributeName: new StringProp('attributeName', { title: translations.attributeName }),
    attributeValue: new StringProp('attributeValue', { title: translations.attributeValue }),
    identifier: new StringProp('identifier', { title: translations.identifier }),
    description: new StringProp('description', { title: translations.description }),
};
