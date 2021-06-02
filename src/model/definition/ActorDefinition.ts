import { ActorType } from '../game/Actor/ActorType';

/** A player made actor definition */
export interface ActorDefinition {
    id: string;
    type: ActorType;
    name: string;
    nounPhrase: string;
    description?: string;
}
