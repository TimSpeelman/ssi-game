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
import { PrivKey } from '../../content/assets/data/cryptography/PrivKey';
import { PubKey } from '../../content/assets/data/cryptography/PubKey';
import { FaceFeature } from '../../content/assets/feature/FaceFeature';
import { Scenario } from '../../model/game/Scenario';
import { ScenarioState } from '../../model/game/ScenarioState';
import { allActors } from '../actors';

const Government = allActors.gov1;
const Shop = allActors.shop1;
const Subject = allActors.John;
const SubjectIdAtGov = 'BSN_990223190';
const SubjectNym1 = '215_JOHN';
const GovNym1 = '829_GOV';
const ShopNym1 = '662_SHOP';
const Attr18Plus = '18+';

const initialState: ScenarioState = new ScenarioState({
    byActor: {
        [Government.id]: {
            actor: Government,
            assets: [
                // { kind: 'data', type: 'human-record', id: SubjectIdAtGov } as HumanRecord,
                {
                    kind: 'data',
                    type: 'attribute-knowledge',
                    issuerId: GovNym1,
                    subjectId: SubjectIdAtGov,
                    name: '18+',
                    value: 'WAAR',
                } as AttributeKnowledge,
                { kind: 'data', type: 'pubkey', id: 'pub', key: GovNym1 } as PubKey,
                { kind: 'data', type: 'privkey', id: 'priv', key: 'asdpa8b348n' } as PrivKey,
            ],
        },
        [Subject.id]: {
            actor: Subject,
            assets: [
                // {
                //     kind: 'physical',
                //     type: 'gov-passport',
                //     id: 'passp',
                //     name: Subject.name,
                //     photo: { id: 'photox', type: 'face', kind: 'data', subjectId: Subject.id },
                // } as GovPassport,
                { kind: 'feature', type: 'face', id: 'face' } as FaceFeature,
                { kind: 'data', type: 'pubkey', id: 'pub', key: SubjectNym1 } as PubKey,
                { kind: 'data', type: 'privkey', id: 'priv', key: 'poweqopuo88' } as PrivKey,
            ],
        },
        [Shop.id]: {
            actor: Shop,
            assets: [
                { kind: 'data', type: 'pubkey', id: 'pub', key: ShopNym1 } as PubKey,
                { kind: 'data', type: 'privkey', id: 'priv', key: '113fasfa' } as PrivKey,
            ],
        },
    },
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
export const OnlineLiquorPurchaseScenario = new Scenario({
    initial: initialState,
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
    steps: [
        // Issuance Phase
        new PhysicalPassportAuthentication('1', {
            verifierId: Government.id,
            humanSubjectId: Subject.id,
            dataSubjectId: SubjectIdAtGov,
        }),
        new WalletSMSAuthentication('2', {
            // Feitelijk is de contactlegging (en challenge) via SMS, authenticatie via P2P protocol
            verifierId: Government.id,
            humanSubjectId: Subject.id,
            dataSubjectId: SubjectNym1, // TODO
        }),
        new Issuance('3', {
            attributeName: '18+',
            attributeValue: 'waar',
            subjectNym: SubjectNym1, // TODO
            issuerNym: GovNym1, // TODO
            issuerId: Government.id,
            subjectId: Subject.id,
        }),
        // Verification Phase
        new WalletQRAuthentication('4', {
            // Feitelijk is de contactlegging via QR, authenticatie via P2P protocol
            verifierId: Shop.id,
            humanSubjectId: Subject.id,
            dataSubjectId: SubjectNym1, // TODO
        }),
        new PresentationRequest('5', {
            verifierId: Shop.id,
            subjectId: Subject.id,
            subjectNym: SubjectNym1, // TODO
            verifierNym: ShopNym1, // TODO
            attributeName: Attr18Plus,
        }),
        new PresentationConsent('6', {
            // Feitelijk geeft het subject toestemming aan de eigen wallet en wordt de toestemming meegestuurd dan wel geimpliceerd in de credentialpresentatie.
            verifierId: Shop.id,
            subjectId: Subject.id,
            subjectNym: SubjectNym1, // TODO
            verifierNym: ShopNym1, // TODO
            attributeName: '18+',
        }),
        new Presentation('7', {
            verifierId: Shop.id,
            subjectId: Subject.id,
            subjectNym: SubjectNym1, // TODO
            verifierNym: ShopNym1, // TODO
            attributeName: '18+',
            attributeValue: 'waar',
            issuerNym: GovNym1, // TODO
        }),
        new CustomInteraction('8', {
            // Feitelijk verifieert de Verifier zelfstandig de verzegeling en ondertekening, en via de ledger de actualiteit (hier wellicht niet relevant)
            fromId: Shop.id,
            toId: Subject.id,
            description: 'Verifieer 18+ bewijs',
            sub: '',
        }),
        new GrantGreenFlag('9', {
            fromId: Shop.id,
            toId: Subject.id,
            description: 'Toegang tot 18+ verkoop',
        }),
    ],
});
