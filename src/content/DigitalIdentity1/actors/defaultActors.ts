/** A list of default actors, used for predefined scenarios */
import { ActorDef } from '../../../model/definition/Actor/ActorDef';
import { actorTypes } from './actorTypes';

export const defaultActors = {
    ledger_1: {
        type: actorTypes.ledger1,
        id: 'ledger_1',
        name: 'Ledger',
        nounPhrase: 'Ledger',
        description: 'Blockchain',
        properties: [],
    } as ActorDef,
    human_1: {
        type: actorTypes.person3,
        id: 'human_1',
        name: 'John',
        nounPhrase: 'John',
        description: 'De consumerende burger',
        properties: [
            ['Geslacht', 'Man'],
            ['Geboortedatum', '13-01-1990'],
        ],
    } as ActorDef,
    government_1: {
        type: actorTypes.gov1,
        id: 'government_1',
        name: 'Overheid',
        nounPhrase: 'de overheid',
        description: 'De overheid van John',
        properties: [],
    } as ActorDef,
    shop_1: {
        type: actorTypes.shop1,
        id: 'shop_1',
        name: 'Slijterij',
        nounPhrase: 'de slijterij',
        description: 'De verkoper van alcoholhoudende dranken',
        properties: [],
    } as ActorDef,
};
