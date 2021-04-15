import { Scenario } from '../../data/scenario/Scenario';
import { allActors } from '../actors';

export const scenario1: Scenario = {
    actors: {
        [allActors.gov1.id]: { actor: allActors.gov1, initialAssets: [] },
        [allActors.office1.id]: { actor: allActors.office1, initialAssets: [] },
        [allActors.person3.id]: { actor: allActors.person3, initialAssets: [] },
    },
    activities: [
        {
            id: '1',
            from: allActors.gov1,
            to: allActors.person3,
            description: 'Uitgifte van paspoort',
            sub: 'naam, geboortedatum',
        },
        {
            id: '2',
            from: allActors.office1,
            to: allActors.person3,
            description: 'Verzoek om gegevens',
            sub: 'naam, geboortedatum',
        },
        {
            id: '3',
            from: allActors.person3,
            to: allActors.office1,
            description: 'Gegevenspresentatie',
            sub: 'naam, geboortedatum',
        },
    ],
};
