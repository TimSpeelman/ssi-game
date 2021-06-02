import { Actor } from '../../definition/Actor';
import { ActorDefinition } from '../../definition/ActorDefinition';

export function definitionToActor(def: ActorDefinition): Actor {
    return {
        ...def.type,
        ...def,
    };
}
