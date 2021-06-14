/** A list of default actors, used for predefined scenarios */
import { ActorDefinition } from '../model/definition/Actor/ActorDefinition';
import { actorTypes } from './actorTypes';

export const defaultActors = {
    human_1: {
        type: actorTypes.person3,
        id: 'human_1',
        name: 'John',
        nounPhrase: 'John',
        description: 'De consumerende burger',
    } as ActorDefinition,
    government_1: {
        type: actorTypes.gov1,
        id: 'government_1',
        name: 'Overheid',
        nounPhrase: 'de overheid',
        description: 'De overheid van John',
    } as ActorDefinition,
    shop_1: {
        type: actorTypes.shop1,
        id: 'shop_1',
        name: 'Slijterij',
        nounPhrase: 'de slijterij',
        description: 'De verkoper van alcoholhoudende dranken',
    } as ActorDefinition,
};
