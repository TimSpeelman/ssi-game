import { Issuance } from '../../content/actions/abc/Issuance';
import { Presentation } from '../../content/actions/abc/Presentation';
import { PresentationConsent } from '../../content/actions/abc/PresentationConsent';
import { PresentationRequest } from '../../content/actions/abc/PresentationRequest';
import { PhysicalPassportAuthentication } from '../../content/actions/authentication/PhysicalPassportAuthentication';
import { WalletQRAuthentication } from '../../content/actions/authentication/WalletQRAuthentication';
import { WalletSMSAuthentication } from '../../content/actions/authentication/WalletSMSAuthentication';
import { CustomInteraction } from '../../content/actions/CustomInteraction';
import { GrantGreenFlag } from '../../content/actions/GrantGreenFlag';
import { AttributeKnowledge } from '../../content/assets/data/abc/AttributeKnowledge';
import { AttributeProof } from '../../content/assets/data/abc/AttributeProof';
import { HumanRecord } from '../../content/assets/data/abc/HumanRecord';
import { FaceFeature } from '../../content/assets/feature/FaceFeature';
import { GovPassport } from '../../content/assets/physical/GovPassport';
import { Wallet } from '../../content/assets/software/Wallet';
import { ActorConfig } from '../../model/definition/Actor/ActorConfig';
import { ScenarioDef } from '../../model/definition/ScenarioDef';
import { defaultActors } from '../defaultActors';

const Government = defaultActors.government_1;
const Shop = defaultActors.shop_1;
const Subject = defaultActors.human_1;
const Ledger = defaultActors.ledger_1;
const SubjectIdAtGov = 'BSN_990223190';
const SubjectNym1 = '215_JOHN';
const GovNym1 = '829_GOV';
const ShopNym1 = '662_SHOP';
const Attr18Plus = '18+';

const actors: ActorConfig[] = [
    {
        definition: Ledger,
        initialAssets: [],
    },
    {
        definition: Government,
        initialAssets: [
            new HumanRecord('2', { subject: SubjectIdAtGov }, true),
            new AttributeKnowledge(
                '3',
                {
                    issuer: GovNym1,
                    subject: SubjectIdAtGov,
                    attributeName: '18+',
                    attributeValue: 'WAAR',
                },
                true,
            ),
        ].map((a) => a.serialize()),
    },
    {
        definition: Subject,
        initialAssets: [
            new Wallet('wallet1', {}, true),
            new AttributeProof(
                'proof1',
                {
                    subject: Subject.id,
                    issuer: Government.id,
                    attributeName: 'attr',
                    attributeValue: 'val',
                    // @ts-ignore TODO FIXME
                    parentId: 'wallet1',
                },
                true,
            ),
            new GovPassport(
                '4',
                {
                    subject: Subject.id,
                    name: Subject.name,
                },
                true,
            ),
            new FaceFeature('5', { subject: Subject.id }, true),
        ].map((a) => a.serialize()),
    },
    {
        definition: Shop,
        initialAssets: [],
    },
];

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
    actors,
    steps: [
        // Issuance Phase
        new PhysicalPassportAuthentication('1', {
            verifier: Government.id,
            subject: Subject.id,
            identifier: SubjectIdAtGov,
        }),
        new WalletSMSAuthentication('2', {
            // Feitelijk is de contactlegging (en challenge) via SMS, authenticatie via P2P protocol
            verifier: Government.id,
            subject: Subject.id,
            identifier: SubjectNym1, // TODO
        }),
        new Issuance('3', {
            attributeName: '18+',
            attributeValue: 'waar',
            subjectNym: SubjectNym1, // TODO
            issuerNym: GovNym1, // TODO
            issuer: Government.id,
            subject: Subject.id,
        }),
        // Verification Phase
        new WalletQRAuthentication('4', {
            // Feitelijk is de contactlegging via QR, authenticatie via P2P protocol
            verifier: Shop.id,
            subject: Subject.id,
            identifier: SubjectNym1, // TODO
        }),
        new PresentationRequest('5', {
            verifier: Shop.id,
            subject: Subject.id,
            subjectNym: SubjectNym1, // TODO
            verifierNym: ShopNym1, // TODO
            attributeName: Attr18Plus,
        }),
        new PresentationConsent('6', {
            // Feitelijk geeft het subject toestemming aan de eigen wallet en wordt de toestemming meegestuurd dan wel geimpliceerd in de credentialpresentatie.
            verifier: Shop.id,
            subject: Subject.id,
            subjectNym: SubjectNym1, // TODO
            verifierNym: ShopNym1, // TODO
            attributeName: '18+',
        }),
        new Presentation('7', {
            verifier: Shop.id,
            subject: Subject.id,
            subjectNym: SubjectNym1, // TODO
            verifierNym: ShopNym1, // TODO
            attributeName: '18+',
            attributeValue: 'waar',
            issuerNym: GovNym1, // TODO
        }),
        new CustomInteraction('8', {
            // Feitelijk verifieert de Verifier zelfstandig de verzegeling en ondertekening, en via de ledger de actualiteit (hier wellicht niet relevant)
            from: Shop.id,
            to: Subject.id,
            description: 'Verifieer 18+ bewijs',
            sub: '',
        }),
        new GrantGreenFlag('9', {
            from: Shop.id,
            to: Subject.id,
            description: 'Toegang tot 18+ verkoop',
        }),
    ].map((s) => s.serialize()),
};
