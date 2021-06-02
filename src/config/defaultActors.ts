/** A list of default actors, used for predefined scenarios */
import { ActorDefinition } from '../model/definition/ActorDefinition';
import { actorTypes } from './actorTypes';

export const defaultActors = {
    human_1: {
        type: actorTypes.person3,
        id: 'human_1',
        name: 'John',
        nounPhrase: 'John',
    } as ActorDefinition,
    government_1: {
        type: actorTypes.gov1,
        id: 'government_1',
        name: 'Overheid',
        nounPhrase: 'de overheid',
    } as ActorDefinition,
    shop_1: {
        type: actorTypes.shop1,
        id: 'shop_1',
        name: 'Winkel',
        nounPhrase: 'de winkel',
    } as ActorDefinition,
};
