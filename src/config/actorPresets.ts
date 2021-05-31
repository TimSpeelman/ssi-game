import { Actor } from '../model/game/Actor';

export const allActorPresets = {
    person3: {
        id: 'person3',
        image: 'person3',
        name: 'John',
        nounPhrase: 'John',
        modeImages: {
            selfie: 'person3_selfie',
            phone: 'person3_phone',
            facescan: 'person3_facescan',
        },
        isMale: true,
        isHuman: true,
    } as Actor,
    person1: {
        id: 'person1',
        image: 'person1',
        name: 'Alice',
        nounPhrase: 'Alice',
        isMale: false,
        isHuman: true,
    } as Actor,
    person2: { id: 'person2', image: 'person2', name: 'Lea', nounPhrase: 'Lea', isMale: false, isHuman: true } as Actor,
    gov1: {
        id: 'gov1',
        image: 'gov1',
        name: 'Overheid',
        nounPhrase: 'de overheid',
        modeImages: {
            issuing: 'gov1_issuing',
        },
        isMale: false,
        isHuman: false,
    } as Actor,
    shop1: {
        id: 'shop1',
        image: 'shop1',
        name: 'Winkel',
        nounPhrase: 'de winkel',
        isMale: false,
        isHuman: false,
    } as Actor,
    office1: {
        id: 'office1',
        image: 'office1',
        name: 'Dienstverlener 1',
        nounPhrase: 'Dienstverlener 1',
        isMale: false,
        isHuman: false,
    } as Actor,
    office2: {
        id: 'office2',
        image: 'office2',
        name: 'Dienstverlener 2',
        nounPhrase: 'Dienstverlener 2',
        isMale: false,
        isHuman: false,
    } as Actor,
    office3: {
        id: 'office3',
        image: 'office3',
        name: 'Dienstverlener 3',
        nounPhrase: 'Dienstverlener 3',
        isMale: false,
        isHuman: false,
    } as Actor,
};
