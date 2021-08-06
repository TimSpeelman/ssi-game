import { ActorDesc } from '../../description/Actor/ActorDesc';
import { Asset } from '../Asset/Asset';

/** The state the actor is in and the assets it has */
export interface ActorState {
    assets: Asset<any>[];
    actor: ActorDesc;
    mode?: string;
}
