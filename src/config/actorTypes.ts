import { ActorType } from '../model/definition/Actor/ActorType';

export const actorTypes = {
    ledger1: {
        id: 'ledger1',
        image: 'ledger1',
        typeName: 'Ledger',
        nounPhrase: 'Ledger',
        isMale: false,
        isHuman: false,
    } as ActorType,
    person1: {
        id: 'person1',
        image: 'person1',
        typeName: 'Alice',
        nounPhrase: 'Alice',
        isMale: false,
        isHuman: true,
    } as ActorType,
    person2: {
        id: 'person2',
        image: 'person2',
        typeName: 'Lea',
        nounPhrase: 'Lea',
        isMale: false,
        isHuman: true,
    } as ActorType,
    person3: {
        id: 'person3',
        image: 'person3',
        typeName: 'John',
        nounPhrase: 'John',
        modeImages: {
            selfie: 'person3_selfie',
            phone: 'person3_phone',
            facescan: 'person3_facescan',
        },
        isMale: true,
        isHuman: true,
    } as ActorType,
    gov1: {
        id: 'gov1',
        image: 'gov1',
        typeName: 'Overheid',
        nounPhrase: 'de overheid',
        modeImages: {
            issuing: 'gov1_issuing',
        },
        isMale: false,
        isHuman: false,
    } as ActorType,
    shop1: {
        id: 'shop1',
        image: 'shop1',
        typeName: 'Winkel',
        nounPhrase: 'de winkel',
        isMale: false,
        isHuman: false,
    } as ActorType,
    office1: {
        id: 'office1',
        image: 'office1',
        typeName: 'Dienstverlener 1',
        nounPhrase: 'Dienstverlener 1',
        isMale: false,
        isHuman: false,
    } as ActorType,
    office2: {
        id: 'office2',
        image: 'office2',
        typeName: 'Dienstverlener 2',
        nounPhrase: 'Dienstverlener 2',
        isMale: false,
        isHuman: false,
    } as ActorType,
    office3: {
        id: 'office3',
        image: 'office3',
        typeName: 'Dienstverlener 3',
        nounPhrase: 'Dienstverlener 3',
        isMale: false,
        isHuman: false,
    } as ActorType,
};
