import { Asset } from '../../content/assets/Asset';
import { Actor } from '../definition/Actor/Actor';

export interface ActorStateDesc {
    assets: Asset[];
    actor: Actor;
    mode?: string;
}
