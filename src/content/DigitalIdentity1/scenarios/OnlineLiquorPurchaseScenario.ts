import { ActorConfig } from '../../../model/definition/Actor/ActorConfig';
import { ScenarioDef } from '../../../model/definition/Scenario/ScenarioDef';
import { orderedMap } from '../../../util/types/OrderedMap';
import { CustomInteraction } from '../actions/CustomInteraction';
import { GrantGreenFlag } from '../actions/GrantGreenFlag';
import { Issuance } from '../actions/Issuance';
import { PhysicalPassportAuthentication } from '../actions/PhysicalPassportAuthentication';
import { Presentation } from '../actions/Presentation';
import { PresentationConsent } from '../actions/PresentationConsent';
import { PresentationRequest } from '../actions/PresentationRequest';
import { WalletQRAuthentication } from '../actions/WalletQRAuthentication';
import { WalletSMSAuthentication } from '../actions/WalletSMSAuthentication';
import { defaultActors } from '../actors/defaultActors';
import { AuthenticationResult } from '../assets/AuthenticationResult';
import { GovPassport } from '../assets/GovPassport';
import { HumanRecord } from '../assets/HumanRecord';
import { Pseudonym } from '../assets/Pseudonym';
import { Wallet } from '../assets/Wallet';

const Government = defaultActors.government_1;
const Shop = defaultActors.shop_1;
const Subject = defaultActors.human_1;
const Ledger = defaultActors.ledger_1;

const SubjectIdAtGov = 'BSN_990223190';
const SubjectNym1 = new Pseudonym(
    'subject-nym-1',
    {
        subject: Subject.id,
        identifier: 'JHN',
        image: 'cat',
    },
    true,
    'wallet1',
);

const GovernmentNym1 = new Pseudonym('government-nym-1', {
    subject: Government.id,
    identifier: 'GOV',
    image: 'hippo',
});

const ShopNym1 = new Pseudonym('shop-nym-1', {
    subject: Shop.id,
    identifier: 'SHP',
    image: 'spider',
});

const Attr18Plus = '18+';

const SubjectPassport = new GovPassport(
    'subject-passport-1',
    {
        subject: Subject.id,
        identifier: 'BSN_102192100',
        name: 'Janssen',
        firstName: 'John',
        dateOfBirth: '12-01-1990',
        placeOfIssuance: 'Den Haag',
        placeOfBirth: 'Rotterdam',
        dateOfIssuance: '13-07-2015',
        dateOfExpiry: '13-07-2025',
        height: '1,83m',
        documentNumber: 'ab91023kl',
        nationality: 'Nederlandse',
    },
    true,
);

const actors: ActorConfig[] = [
    {
        id: Ledger.id,
        definition: Ledger,
        initialAssets: [],
    },
    {
        id: Government.id,
        definition: Government,
        initialAssets: [GovernmentNym1, new HumanRecord('2', { subject: SubjectIdAtGov }, true)].map((a) =>
            a.serialize(),
        ),
    },
    {
        id: Subject.id,
        definition: Subject,
        initialAssets: [SubjectNym1, new Wallet('wallet1', {}, true), SubjectPassport].map((a) => a.serialize()),
    },
    {
        id: Shop.id,
        definition: Shop,
        initialAssets: [
            ShopNym1,
            new AuthenticationResult(
                '6',
                { identifier: GovernmentNym1.defProps.identifier, subject: Government.id },
                true,
            ),
        ].map((a) => a.serialize()),
    },
];

const stepIssuance = new Issuance('3', {
    explanation: '',
    attributeName: '18+',
    attributeValue: 'waar',
    subjectNym: SubjectNym1.id,
    issuerNym: GovernmentNym1.id,
    issuer: Government.id,
    subject: Subject.id,
});
/**
 * This scenario describes a presentation of an 18+ credential to a liquor store.
 *
 * It consists of two stages:
 * - In the 'issuing' stage Alice meets a government official and asks for an 18+ credential.
 * - In the 'verifying' stage Alice visits a web shop selling liquor, which asks for a government signed 18+ credential.
 *
 * The issuing phase:
 * 1. Government authenticates Alice by Face and Passport.
 * 2. Government authenticates Alice's Pseudonym (Wallet) by Text Message Verification.
 * 3. Government issues 18+ credential to Alice's Pseudonym.
 *
 * The verifying phase:
 * 4. Liquor Store authenticates Alice's Pseudonym by ChallengeResponse.
 * 5. Liquor Store requests 18+ credential of Alice's Wallet.
 * 6. Alice gives consent.
 * 7. Alice's Wallet presents 18+ credential.
 * 8. Liquor Store verifies credential.
 * 9. Liquor Store grants access to Alice (pass).
 *
 * Liveness detection / realtime authentication may not be necessary in this scenario (wallet possession is strong one-factor authentication and therefore sufficient).
 */
export const OnlineLiquorPurchaseScenario: ScenarioDef = {
    meta: {
        title: 'Online alcoholverkoop met Self-Sovereign Identity',
        author: 'Tim Speelman',
        body:
            'Om de online verkoop van alcohol veilig te maken, dient worden gecontroleerd ' +
            'dat de koper ten minste 18 jaar oud is. In dit scenario bewijst een koper dit ' +
            'met behulp van Self-Sovereign Identity. Daartoe haalt hij een ' +
            'bewijs van 18+ zijn op bij het gemeenteloket, welke hij vervolgens gebruikt ' +
            'om online alcohol te kopen.',
    },
    actors: orderedMap.fromList(actors),
    steps: [
        // Issuance Phase
        new PhysicalPassportAuthentication('1', {
            explanation: '',
            verifier: Government.id,
            subject: Subject.id,
            subjectPassport: SubjectPassport.id,
        }),
        new WalletSMSAuthentication('2', {
            // Feitelijk is de contactlegging (en challenge) via SMS, authenticatie via P2P protocol
            explanation: '',
            verifier: Government.id,
            subject: Subject.id,
            subjectNym: SubjectNym1.id,
        }),
        stepIssuance,
        // Verification Phase
        new WalletQRAuthentication('4', {
            // Feitelijk is de contactlegging via QR, authenticatie via P2P protocol
            explanation: '',
            verifier: Shop.id,
            subject: Subject.id,
            subjectNym: SubjectNym1.id,
        }),
        new PresentationRequest('5', {
            explanation: '',
            verifier: Shop.id,
            subject: Subject.id,
            subjectNym: SubjectNym1.id,
            verifierNym: ShopNym1.id,
            attributeName: Attr18Plus,
        }),
        new PresentationConsent('6', {
            // Feitelijk geeft het subject toestemming aan de eigen wallet en wordt de toestemming meegestuurd dan wel geimpliceerd in de credentialpresentatie.
            explanation: '',
            verifier: Shop.id,
            subject: Subject.id,
            subjectNym: SubjectNym1.id,
            verifierNym: ShopNym1.id,
            credential: stepIssuance.credentialId,
        }),
        new Presentation('7', {
            explanation: '',
            verifier: Shop.id,
            subject: Subject.id,
            subjectNym: SubjectNym1.id,
            verifierNym: ShopNym1.id,
            credential: stepIssuance.credentialId,
        }),
        new CustomInteraction('8', {
            // Feitelijk verifieert de Verifier zelfstandig de verzegeling en ondertekening, en via de ledger de actualiteit (hier wellicht niet relevant)
            explanation: '',
            from: Shop.id,
            to: Subject.id,
            description: 'Verifieer 18+ bewijs',
            sub: '',
        }),
        new GrantGreenFlag('9', {
            explanation: '',
            from: Shop.id,
            to: Subject.id,
            description: 'Toegang tot 18+ verkoop',
        }),
    ].map((s) => s.serialize()),
};
