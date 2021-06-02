import { Actor } from './Actor';
import { ActorType } from './ActorType';

/** A player made actor definition */
export interface ActorDefinition {
    id: string;
    type: ActorType;
    name: string;
    nounPhrase: string;
    description?: string;
}

export const definitionToActor = (def: ActorDefinition): Actor => ({
    ...def.type,
    ...def,
});
