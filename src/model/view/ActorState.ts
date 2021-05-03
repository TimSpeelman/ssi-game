import { Asset } from '../../content/assets/Asset';
import { Actor } from '../game/Actor';

export interface ActorState {
    assets: Asset[];
    actor: Actor;
    mode?: string;
}
