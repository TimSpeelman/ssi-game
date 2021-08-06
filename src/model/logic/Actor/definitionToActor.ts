import { ActorDef } from '../../definition/Actor/ActorDef';
import { ActorDesc } from '../../description/Actor/ActorDesc';

export function definitionToActor(def: ActorDef): ActorDesc {
    return {
        ...def.type,
        ...def,
    };
}
