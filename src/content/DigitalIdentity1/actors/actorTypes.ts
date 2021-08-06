import { ActorType } from '../../../model/definition/Actor/ActorType';
import { actorImage } from './actorImage';

export const actorTypes = {
    ledger1: {
        id: 'ledger1',
        image: { type: 'image', url: actorImage('ledger1') },
        typeName: 'Ledger',
        nounPhrase: 'Ledger',
        isMale: false,
        isHuman: false,
    } as ActorType,
    person1: {
        id: 'person1',
        image: { type: 'image', url: actorImage('person1') },
        typeName: 'Alice',
        nounPhrase: 'Alice',
        isMale: false,
        isHuman: true,
    } as ActorType,
    person2: {
        id: 'person2',
        image: { type: 'image', url: actorImage('person2') },
        typeName: 'Lea',
        nounPhrase: 'Lea',
        isMale: false,
        isHuman: true,
    } as ActorType,
    person3: {
        id: 'person3',
        image: { type: 'image', url: actorImage('person3') },
        typeName: 'John',
        nounPhrase: 'John',
        modeImages: {
            selfie: { type: 'image', url: actorImage('person3_selfie') },
            phone: { type: 'image', url: actorImage('person3_phone') },
            facescan: { type: 'image', url: actorImage('person3_facescan') },
        },
        isMale: true,
        isHuman: true,
    } as ActorType,
    gov1: {
        id: 'gov1',
        image: { type: 'image', url: actorImage('gov1') },
        typeName: 'Overheid',
        nounPhrase: 'de overheid',
        modeImages: {
            issuing: { type: 'image', url: actorImage('gov1_issuing') },
        },
        isMale: false,
        isHuman: false,
    } as ActorType,
    shop1: {
        id: 'shop1',
        image: { type: 'image', url: actorImage('shop1') },
        typeName: 'Winkel',
        nounPhrase: 'de winkel',
        isMale: false,
        isHuman: false,
    } as ActorType,
    office1: {
        id: 'office1',
        image: { type: 'image', url: actorImage('office1') },
        typeName: 'Dienstverlener 1',
        nounPhrase: 'Dienstverlener 1',
        isMale: false,
        isHuman: false,
    } as ActorType,
    office2: {
        id: 'office2',
        image: { type: 'image', url: actorImage('office2') },
        typeName: 'Dienstverlener 2',
        nounPhrase: 'Dienstverlener 2',
        isMale: false,
        isHuman: false,
    } as ActorType,
    office3: {
        id: 'office3',
        image: { type: 'image', url: actorImage('office3') },
        typeName: 'Dienstverlener 3',
        nounPhrase: 'Dienstverlener 3',
        isMale: false,
        isHuman: false,
    } as ActorType,
};