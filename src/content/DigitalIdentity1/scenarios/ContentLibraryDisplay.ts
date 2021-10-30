/**
 * This scenario is for testing and development purposes only.
 * It displays every piece of content in this content library.
 */
import { ActorConfig } from '../../../model/definition/Actor/ActorConfig';
import { AssetDef } from '../../../model/definition/Asset/AssetDef';
import { ScenarioDef } from '../../../model/definition/Scenario/ScenarioDef';
import { Asset } from '../../../model/logic/Asset/Asset';
import { Action } from '../../../model/logic/Step/Action';
import { orderedMap } from '../../../util/types/OrderedMap';
import { actionCollection } from '../actions';
import { CustomInteraction } from '../actions/CustomInteraction';
import { GrantGreenFlag } from '../actions/GrantGreenFlag';
import { Handover } from '../actions/Handover';
import { Issuance } from '../actions/Issuance';
import { PassportIssuance } from '../actions/PassportIssuance';
import { PhysicalPassportAuthentication } from '../actions/PhysicalPassportAuthentication';
import { Presentation } from '../actions/Presentation';
import { PresentationConsent } from '../actions/PresentationConsent';
import { PresentationRequest } from '../actions/PresentationRequest';
import { Revocation } from '../actions/Revocation';
import { WalletQRAuthentication } from '../actions/WalletQRAuthentication';
import { WalletSMSAuthentication } from '../actions/WalletSMSAuthentication';
import { defaultActors } from '../actors/defaultActors';
import { assetCollection } from '../assets';
import { AttributeKnowledge } from '../assets/AttributeKnowledge';
import { AttributeRequest } from '../assets/AttributeRequest';
import { AttributeRevocation } from '../assets/AttributeRevocation';
import { AuthenticationResult } from '../assets/AuthenticationResult';
import { Consent } from '../assets/Consent';
import { Credential } from '../assets/Credential';
import { GovPassport } from '../assets/GovPassport';
import { GreenFlag } from '../assets/GreenFlag';
import { HumanRecord } from '../assets/HumanRecord';
import { Pseudonym } from '../assets/Pseudonym';
import { PUF } from '../assets/PUF';
import { Wallet } from '../assets/Wallet';

// **Actors**
// We start with the actors. We will use three of the default actors
// for this scenario.
const Actor1 = {
    ...defaultActors.government_1,
    id: 'ACTOR_1',
    name: 'ACTOR_1',
    nounPhrase: 'ACTOR_1',
    description: 'ACTOR_DESC_1',
};
const Actor2 = {
    ...defaultActors.human_1,
    id: 'ACTOR_2',
    name: 'ACTOR_2',
    nounPhrase: 'ACTOR_2',
    description: 'ACTOR_DESC_2',
};
const Actor3 = {
    ...defaultActors.shop_1,
    id: 'ACTOR_3',
    name: 'ACTOR_3',
    nounPhrase: 'ACTOR_3',
    description: 'ACTOR_DESC_3',
};

// **Pseudonyms**
// Each actor will have its own pseudonym.
const Nym1 = new Pseudonym('Nym1', { subject: Actor1.id, identifier: 'NYM1', image: 'hippo' });
const Nym2 = new Pseudonym('Nym2', { subject: Actor2.id, identifier: 'NYM2', image: 'cat' });
const Nym3 = new Pseudonym('Nym3', { subject: Actor3.id, identifier: 'NYM3', image: 'fish' });

// **Assets**
// We now create one asset of each type
const AttributeKnowledge1 = new AttributeKnowledge('AttributeKnowledge1', {
    attributeName: 'ATTR_NAME_1',
    attributeValue: 'ATTR_VAL_1',
    issuerNym: Nym1.id,
    subjectNym: Nym2.id,
});
const Credential1 = new Credential('Credential1', {
    attributeName: 'ATTR_NAME_1',
    attributeValue: 'ATTR_VAL_1',
    issuerNym: Nym1.id,
    subjectNym: Nym2.id,
});
const Credential2 = new Credential('Credential2', {
    attributeName: 'ATTR_NAME_2',
    attributeValue: 'ATTR_VAL_2',
    issuerNym: Nym1.id,
    subjectNym: Nym2.id,
});
const AttributeRequest1 = new AttributeRequest('AttributeRequest1', {
    attributeName: 'ATTR_NAME_1',
    subject: Actor2.id,
    verifier: Actor3.id,
});
const AttributeRevocation1 = new AttributeRevocation('AttributeRevocation1', {
    credential: Credential1.id,
    issuer: Actor1.id,
    subject: Actor2.id,
});
const AuthenticationResult1 = new AuthenticationResult('AuthenticationResult1', {
    identifier: 'ID1',
    subject: Actor2.id,
});
const Consent1 = new Consent('Consent1', {
    credential: Credential1.id,
    subject: Actor2.id,
    verifier: Actor3.id,
});
const GovPassport1 = new GovPassport('GovPassport1', {
    subject: Actor2.id,
    identifier: 'BSN_1',
    name: 'NAME_1',
    firstName: 'FIRST_NAME_1',
    dateOfBirth: 'DOB_1',
    placeOfIssuance: 'PLACE_OF_ISSUANCE_1',
    placeOfBirth: 'PLACE_OF_BIRTH_1',
    dateOfIssuance: 'DATE_OF_ISSUANCE_1',
    dateOfExpiry: 'DATE_OF_EXPIRY_1',
    height: 'HEIGHT_1',
    documentNumber: 'DOC_NUMBER_1',
    nationality: 'NATIONALITY_1',
});
const GreenFlag1 = new GreenFlag('GreenFlag1', {
    description: 'GREEN_FLAG_DESCRIPTION_1',
});
const HumanRecord1 = new HumanRecord('HumanRecord1', {
    subject: Actor2.id,
});
const PUF1 = new PUF('PUF1', {
    secret: 'SECRET_1',
});
const Wallet1 = new Wallet('Wallet1', {});

// **Assigning Assets to Actors**
// We will need to assign each of the initial assets to actors

const actorConfig1: ActorConfig = {
    id: Actor1.id,
    definition: Actor1,
    initialAssets: serializeAssets([Nym1, AttributeKnowledge1, HumanRecord1]),
};
const actorConfig2: ActorConfig = {
    id: Actor2.id,
    definition: Actor2,
    initialAssets: serializeAssets([
        Nym2,
        Credential1,
        Credential2,
        AttributeRequest1,
        AttributeRevocation1,
        GovPassport1,
        GreenFlag1,
        PUF1,
        Wallet1,
    ]),
};
const actorConfig3: ActorConfig = {
    id: Actor3.id,
    definition: Actor3,
    initialAssets: serializeAssets([Nym3, AuthenticationResult1, Consent1]),
};

const actorsConfigurations = [actorConfig1, actorConfig2, actorConfig3];

// Just checking we did not miss any asset types in our library.
const allAssets = actorsConfigurations.reduce((all, c) => [...all, ...c.initialAssets], [] as AssetDef[]);
const allAssetTypesInLibrary = assetCollection.types.map((t) => t.schema.typeName);
const missingAssets = allAssetTypesInLibrary.filter((t) => !allAssets.some((a) => a.typeName === t));
if (missingAssets.length > 0) {
    throw new Error('Missing assets from library: ' + missingAssets.join(', '));
}

// **Steps**
// We now create an action of each type
const PassportIssuance1 = new PassportIssuance('PassportIssuance1', {
    issuer: Actor1.id,
    subject: Actor2.id,
    explanation: '',
    identifier: 'BSN_2',
    name: 'NAME_2',
    firstName: 'FIRST_NAME_2',
    dateOfBirth: 'DOB_2',
    placeOfIssuance: 'PLACE_OF_ISSUANCE_2',
    placeOfBirth: 'PLACE_OF_BIRTH_2',
    dateOfIssuance: 'DATE_OF_ISSUANCE_2',
    dateOfExpiry: 'DATE_OF_EXPIRY_2',
    height: 'HEIGHT_2',
    documentNumber: 'DOC_NUMBER_2',
    nationality: 'NATIONALITY_2',
});
const Issuance1 = new Issuance('Issuance1', {
    attributeName: 'ATTR_NAME_3',
    attributeValue: 'ATTR_VALUE_3',
    explanation: 'USER_EXPLANATION_1',
    issuer: Actor1.id,
    issuerNym: Nym1.id,
    subject: Actor2.id,
    subjectNym: Nym2.id,
});
const Presentation1 = new Presentation('Presentation1', {
    credential: Credential2.id,
    explanation: 'USER_EXPLANATION_2',
    subject: Actor2.id,
    subjectNym: Nym2.id,
    verifier: Actor3.id,
    verifierNym: Nym3.id,
});
const PresentationConsent1 = new PresentationConsent('PresentationConsent1', {
    credential: Credential2.id,
    explanation: 'USER_EXPLANATION_3',
    subject: Actor2.id,
    subjectNym: Nym2.id,
    verifier: Actor3.id,
    verifierNym: Nym3.id,
});
const PresentationRequest1 = new PresentationRequest('PresentationRequest1', {
    attributeName: 'ATTR_NAME_1',
    explanation: 'USER_EXPLANATION_4',
    subject: Actor2.id,
    subjectNym: Nym2.id,
    verifier: Actor3.id,
    verifierNym: Nym3.id,
});
const Revocation1 = new Revocation('Revocation1', {
    credential: Credential2.id,
    explanation: 'USER_EXPLANATION_5',
    issuer: Actor1.id,
    subject: Actor2.id,
});
const PhysicalPassportAuthentication1 = new PhysicalPassportAuthentication('PhysicalPassportAuthentication1', {
    explanation: 'USER_EXPLANATION_6',
    subject: Actor2.id,
    subjectPassport: GovPassport1.id,
    verifier: Actor3.id,
});
const WalletQRAuthentication1 = new WalletQRAuthentication('WalletQRAuthentication1', {
    explanation: 'USER_EXPLANATION_7',
    subject: Actor2.id,
    subjectNym: Nym2.id,
    verifier: Actor3.id,
});
const WalletSMSAuthentication1 = new WalletSMSAuthentication('WalletSMSAuthentication1', {
    explanation: 'USER_EXPLANATION_8',
    subject: Actor2.id,
    subjectNym: Nym2.id,
    verifier: Actor3.id,
});
const CustomInteraction1 = new CustomInteraction('CustomInteraction1', {
    explanation: 'USER_EXPLANATION_9',
    description: 'CUSTOM_INTERACTION_TITLE_1',
    sub: 'CUSTOM_INTERACTION_SUB_1',
    from: Actor3.id,
    to: Actor1.id,
});
const GrantGreenFlag1 = new GrantGreenFlag('GrantGreenFlag1', {
    explanation: 'USER_EXPLANATION_10',
    description: 'GRANT_GREEN_FLAG_DESCRIPTION_1',
    from: Actor3.id,
    to: Actor1.id,
});
const Handover1 = new Handover('Handover1', {
    explanation: 'USER_EXPLANATION_11',
    asset: GovPassport1.id,
    from: Actor2.id,
    to: Actor3.id,
});

const steps = [
    PassportIssuance1,
    Issuance1,
    Presentation1,
    PresentationConsent1,
    PresentationRequest1,
    Revocation1,
    PhysicalPassportAuthentication1,
    WalletQRAuthentication1,
    WalletSMSAuthentication1,
    CustomInteraction1,
    GrantGreenFlag1,
    Handover1,
];

// Just checking we did not miss any action types in our library.
const allActionTypesInLibrary = actionCollection.types.map((t) => t.schema.typeName);
const missingActions = allActionTypesInLibrary.filter((t) => !steps.some((a) => a.schema.typeName === t));
if (missingActions.length > 0) {
    throw new Error('Missing actions from library: ' + missingActions.join(', '));
}

/**
 * This scenario is for testing and development purposes only.
 * It displays every piece of content in this content library.
 */
export const ContentLibraryDisplayScenario: ScenarioDef = {
    meta: {
        title: 'Content Library Display Scenario',
        author: 'Tim Speelman',
        body:
            'This scenario is for testing and development purposes only.' +
            ' It displays every piece of content in this content library.',
    },
    actors: orderedMap.fromList(actorsConfigurations),
    steps: serializeActions(steps),
};

function serializeAssets(assets: Asset<any>[]) {
    return assets.map((a) => a.serialize());
}

function serializeActions(assets: Action<any>[]) {
    return assets.map((a) => a.serialize());
}
