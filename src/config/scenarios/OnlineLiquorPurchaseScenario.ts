import { Scenario } from '../../data/scenario/Scenario';
import { allActors } from '../actors';

const Issuer = allActors.gov1;
const Verifier = allActors.shop1;
const Subject = allActors.person3;

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
export const OnlineLiquorPurchaseScenario: Scenario = {
    actors: {
        [Issuer.id]: { actor: Issuer, initialAssets: [] },
        [Subject.id]: { actor: Subject, initialAssets: [] },
        [Verifier.id]: { actor: Verifier, initialAssets: [] },
    },
    activities: [
        // Issuance Phase
        {
            id: '1',
            from: Issuer,
            to: Subject,
            description: 'Fysieke authenticatie o.b.v. paspoort',
            sub: '',
        },
        {
            id: '2',
            from: Issuer,
            to: Subject,
            // Feitelijk is de contactlegging (en challenge) via SMS, authenticatie via P2P protocol
            description: 'Authenticatie van wallet (pseudoniem) via SMS',
            sub: 'public key',
        },
        {
            id: '3',
            from: Issuer,
            to: Subject,
            description: 'Geef attribuut 18+ uit',
            sub: '18+ credential',
        },
        // Verification Phase
        {
            id: '4',
            from: Verifier,
            to: Subject,
            // Feitelijk is de contactlegging via QR, authenticatie via P2P protocol
            description: 'Authenticatie van wallet (pseudoniem) via QR',
            sub: 'public key',
        },
        {
            id: '5',
            from: Verifier,
            to: Subject,
            description: 'Vraag 18+ credential aan',
            sub: 'attribuutverzoek 18+',
        },
        {
            id: '6',
            from: Subject,
            // Feitelijk geeft het subject toestemming aan de eigen wallet en wordt de toestemming meegestuurd dan wel geimpliceerd in de credentialpresentatie.
            to: Verifier,
            description: 'Geef toestemming',
            sub: 'consent',
        },
        {
            id: '7',
            from: Subject,
            to: Verifier,
            description: 'Presenteer 18+ bewijs',
            sub: 'attribuutbewijs 18+',
        },
        {
            id: '8',
            from: Verifier,
            to: Subject,
            // Feitelijk verifieert de Verifier zelfstandig de verzegeling en ondertekening, en via de ledger de actualiteit (hier wellicht niet relevant)
            description: 'Verifieer 18+ bewijs',
            sub: '',
        },
        {
            id: '9',
            from: Verifier,
            to: Subject,
            description: 'Geef toegang tot 18+ verkoop',
            sub: 'groene vlag',
        },
    ],
};
