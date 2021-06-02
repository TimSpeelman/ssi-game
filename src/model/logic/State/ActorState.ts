import { Actor } from '../../definition/Actor/Actor';
import { Asset } from '../Asset/Asset';

/** The state the actor is in and the assets it has */
export interface ActorState {
    assets: Asset<any>[];
    actor: Actor;
    mode?: string;
}
