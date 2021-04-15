import { PhysicalPassportAuthentication } from '../../data/action/authentication/PhysicalPassportAuthentication';
import { CustomInteraction } from '../../data/action/CustomInteraction';
import { Scenario, ScenarioStateDescription } from '../../data/scenario/Scenario';
import { allActors } from '../actors';

const Government = allActors.gov1;
const Shop = allActors.shop1;
const Subject = allActors.person3;

const initialState: ScenarioStateDescription = {
    actors: {
        [Government.id]: { actor: Government, assets: [] },
        [Subject.id]: { actor: Subject, assets: [] },
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
        new CustomInteraction('2', {
            // Feitelijk is de contactlegging (en challenge) via SMS, authenticatie via P2P protocol
            from: Government,
            to: Subject,
            description: 'Authenticatie van wallet (pseudoniem) via SMS',
            sub: 'public key',
        }),
        new CustomInteraction('3', {
            from: Government,
            to: Subject,
            description: 'Geef attribuut 18+ uit',
            sub: '18+ credential',
        }),
        // Verification Phase
        new CustomInteraction('4', {
            // Feitelijk is de contactlegging via QR, authenticatie via P2P protocol
            from: Shop,
            to: Subject,
            description: 'Authenticatie van wallet (pseudoniem) via QR',
            sub: 'public key',
        }),
        new CustomInteraction('5', {
            from: Shop,
            to: Subject,
            description: 'Vraag 18+ credential aan',
            sub: 'attribuutverzoek 18+',
        }),
        new CustomInteraction('6', {
            // Feitelijk geeft het subject toestemming aan de eigen wallet en wordt de toestemming meegestuurd dan wel geimpliceerd in de credentialpresentatie.
            from: Subject,
            to: Shop,
            description: 'Geef toestemming',
            sub: 'consent',
        }),
        new CustomInteraction('7', {
            from: Subject,
            to: Shop,
            description: 'Presenteer 18+ bewijs',
            sub: 'attribuutbewijs 18+',
        }),
        new CustomInteraction('8', {
            // Feitelijk verifieert de Verifier zelfstandig de verzegeling en ondertekening, en via de ledger de actualiteit (hier wellicht niet relevant)
            from: Shop,
            to: Subject,
            description: 'Verifieer 18+ bewijs',
            sub: '',
        }),
        new CustomInteraction('9', {
            from: Shop,
            to: Subject,
            description: 'Geef toegang tot 18+ verkoop',
            sub: 'groene vlag',
        }),
    ],
});
