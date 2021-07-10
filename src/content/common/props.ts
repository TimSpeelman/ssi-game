import { translations } from '../../intl/dictionaries';
import { ActorProp } from '../../model/content/Common/Prop/ActorProp';
import { AssetProp } from '../../model/content/Common/Prop/AssetProp';
import { StringProp } from '../../model/content/Common/Prop/StringProp';

export const CommonProps = {
    issuer: new ActorProp({ title: translations.issuer }),
    subject: new ActorProp({ title: translations.subject }),
    verifier: new ActorProp({ title: translations.verifier }),
    issuerNym: new AssetProp({
        title: translations.issuerPseudonym,
        dependsOn: ['issuer'],
        filter: (a, data) => a.asset.type === 'Wallet' && a.ownerId === data.issuer,
        autoFill: true,
    }),
    subjectNym: new AssetProp({
        title: translations.subjectPseudonym,
        dependsOn: ['subject'],
        filter: (a, data) => a.asset.type === 'Wallet' && a.ownerId === data.subject,
        autoFill: true,
    }),
    verifierNym: new AssetProp({
        title: translations.verifierPseudonym,
        dependsOn: ['verifier'],
        filter: (a, data) => a.asset.type === 'Wallet' && a.ownerId === data.verifier,
        autoFill: true,
    }),
    attributeName: new StringProp({ title: translations.attributeName }),
    attributeValue: new StringProp({ title: translations.attributeValue }),
    identifier: new StringProp({ title: translations.identifier }),
    description: new StringProp({ title: translations.description }),
};