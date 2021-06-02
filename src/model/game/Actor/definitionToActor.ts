import { Actor } from './Actor';
import { ActorDefinition } from './ActorDefinition';

export function definitionToActor(def: ActorDefinition): Actor {
    return {
        ...def.type,
        ...def,
    };
}
