import { ActorConfig } from '../../../model/definition/Actor/ActorConfig';
import { ScenarioDef } from '../../../model/definition/Scenario/ScenarioDef';
import { orderedMap } from '../../../util/types/OrderedMap';
import { GrantGreenFlag } from '../actions/GrantGreenFlag';
import { PhysicalPassportAuthentication } from '../actions/PhysicalPassportAuthentication';
import { defaultActors } from '../actors/defaultActors';
import { GovPassport } from '../assets/GovPassport';

const Shop = defaultActors.shop_1;
const Subject = defaultActors.human_1;

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
        id: Subject.id,
        definition: Subject,
        initialAssets: [SubjectPassport].map((a) => a.serialize()),
    },
    {
        id: Shop.id,
        definition: Shop,
        initialAssets: [],
    },
];

/**
 * This scenario is used for the guided tour.
 */
export const TourScenario: ScenarioDef = {
    meta: {
        title: 'Leeftijdscontrole bij alcoholverkoop (demo scenario)',
        author: 'Tim Speelman',
        body:
            'Om alcoholmisbruik onder jongeren te voorkomen dient te worden gecontroleerd' +
            ' dat de koper ten minste 18 jaar oud is. In dit scenario bewijst een koper' +
            ' dit op de traditionele manier: met het tonen van het paspoort.',
    },
    actors: orderedMap.fromList(actors),
    steps: [
        // Issuance Phase
        new PhysicalPassportAuthentication('1', {
            explanation: '',
            verifier: Shop.id,
            subject: Subject.id,
            subjectPassport: SubjectPassport.id,
        }),
        new GrantGreenFlag('9', {
            explanation: '',
            from: Shop.id,
            to: Subject.id,
            description: 'Verkoop van fles wijn',
        }),
    ].map((s) => s.serialize()),
};
