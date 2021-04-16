import { Issuance } from '../../data/action/abc/Issuance';
import { Presentation } from '../../data/action/abc/Presentation';
import { PresentationConsent } from '../../data/action/abc/PresentationConsent';
import { PresentationRequest } from '../../data/action/abc/PresentationRequest';
import { PhysicalPassportAuthentication } from '../../data/action/authentication/PhysicalPassportAuthentication';
import { WalletQRAuthentication } from '../../data/action/authentication/WalletQRAuthentication';
import { WalletSMSAuthentication } from '../../data/action/authentication/WalletSMSAuthentication';
import { CustomInteraction } from '../../data/action/CustomInteraction';
import { GrantGreenFlag } from '../../data/action/GrantGreenFlag';
import { PrivKey } from '../../data/asset/data/cryptography/PrivKey';
import { PubKey } from '../../data/asset/data/cryptography/PubKey';
import { FaceFeature } from '../../data/asset/feature/FaceFeature';
import { FingerprintFeature } from '../../data/asset/feature/FingerprintFeature';
import { GovPassport } from '../../data/asset/physical/GovPassport';
import { Scenario, ScenarioStateDescription } from '../../data/scenario/Scenario';
import { allActors } from '../actors';

const Government = allActors.gov1;
const Shop = allActors.shop1;
const Subject = allActors.person3;

const initialState: ScenarioStateDescription = {
    actors: {
        [Government.id]: {
            actor: Government,
            assets: [
                { kind: 'data', type: 'pubkey', id: 'pub', key: 'asdasda' } as PubKey,
                { kind: 'data', type: 'privkey', id: 'priv', key: 'asdpa8b348n' } as PrivKey,
            ],
        },
        [Subject.id]: {
            actor: Subject,
            assets: [
                {
                    kind: 'physical',
                    type: 'gov-passport',
                    id: 'passp',
                    name: Subject.name,
                    photo: { id: 'photox', type: 'face', kind: 'data', subjectId: Subject.id },
                } as GovPassport,
                { kind: 'feature', type: 'face', id: 'face' } as FaceFeature,
                { kind: 'feature', type: 'fingerprint', id: 'fingerprint' } as FingerprintFeature,
            ],
        },
        [Shop.id]: { actor: Shop, assets: [] },
    },
};

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
    steps: [
        // Issuance Phase
        new PhysicalPassportAuthentication('1', {
            verifierId: Government.id,
            humanSubjectId: Subject.id,
            dataSubjectId: 'SUB@GOV',
        }),
        new WalletSMSAuthentication('2', {
            // Feitelijk is de contactlegging (en challenge) via SMS, authenticatie via P2P protocol
            verifierId: Government.id,
            humanSubjectId: Subject.id,
            dataSubjectId: 'SomePseudonym', // TODO
        }),
        new Issuance('3', {
            attributeName: '18+',
            attributeValue: 'waar',
            subjectNym: 'SomePseudonym', // TODO
            issuerNym: 'GovKey', // TODO
            issuerId: Government.id,
            subjectId: Subject.id,
        }),
        // Verification Phase
        new WalletQRAuthentication('4', {
            // Feitelijk is de contactlegging via QR, authenticatie via P2P protocol
            verifierId: Shop.id,
            humanSubjectId: Subject.id,
            dataSubjectId: 'SomePseudonym', // TODO
        }),
        new PresentationRequest('5', {
            verifierId: Shop.id,
            subjectId: Subject.id,
            subjectNym: 'SomePseudonym', // TODO
            verifierNym: 'ShopKey', // TODO
            attributeName: '18+',
        }),
        new PresentationConsent('6', {
            // Feitelijk geeft het subject toestemming aan de eigen wallet en wordt de toestemming meegestuurd dan wel geimpliceerd in de credentialpresentatie.
            verifierId: Shop.id,
            subjectId: Subject.id,
            subjectNym: 'SomePseudonym', // TODO
            verifierNym: 'ShopKey', // TODO
            attributeName: '18+',
        }),
        new Presentation('7', {
            verifierId: Shop.id,
            subjectId: Subject.id,
            subjectNym: 'SomePseudonym', // TODO
            verifierNym: 'ShopKey', // TODO
            attributeName: '18+',
            attributeValue: 'waar',
            issuerNym: 'GovKey', // TODO
        }),
        new CustomInteraction('8', {
            // Feitelijk verifieert de Verifier zelfstandig de verzegeling en ondertekening, en via de ledger de actualiteit (hier wellicht niet relevant)
            from: Shop,
            to: Subject,
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
