import { Actor } from '../../../model/definition/Actor/Actor';
import { actorTypes } from './actorTypes';

export const allActorPresets = {
    person3: {
        ...actorTypes.person3,
        name: 'John',
        nounPhrase: 'John',
    } as Actor,
    person1: {
        ...actorTypes.person1,
        name: 'Alice',
        nounPhrase: 'Alice',
    } as Actor,
    person2: {
        ...actorTypes.person2,
        name: 'Lea',
        nounPhrase: 'Lea',
    } as Actor,
    gov1: {
        ...actorTypes.gov1,
        name: 'Overheid',
        nounPhrase: 'de overheid',
    } as Actor,
    shop1: {
        ...actorTypes.shop1,
        name: 'Winkel',
        nounPhrase: 'de winkel',
    } as Actor,
    office1: {
        ...actorTypes.office1,
        name: 'Dienstverlener 1',
        nounPhrase: 'Dienstverlener 1',
    } as Actor,
    office2: {
        ...actorTypes.office2,
        name: 'Dienstverlener 2',
        nounPhrase: 'Dienstverlener 2',
    } as Actor,
    office3: {
        ...actorTypes.office3,
        name: 'Dienstverlener 3',
        nounPhrase: 'Dienstverlener 3',
    } as Actor,
};
