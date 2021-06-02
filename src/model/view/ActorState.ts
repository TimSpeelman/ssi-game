import { Asset } from '../../content/assets/Asset';
import { Actor } from '../definition/Actor';

export interface ActorState {
    assets: Asset[];
    actor: Actor;
    mode?: string;
}
