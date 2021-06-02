import { Actor } from './Actor';
import { ActorType } from './ActorType';

/** The game predefines some actor types a player can choose from */
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
