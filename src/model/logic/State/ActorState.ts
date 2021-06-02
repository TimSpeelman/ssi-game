import { Asset } from '../../../content/assets/Asset';
import { Actor } from '../../definition/Actor/Actor';

/** The state the actor is in and the assets it has */
export interface ActorState {
    assets: Asset[];
    actor: Actor;
    mode?: string;
}
