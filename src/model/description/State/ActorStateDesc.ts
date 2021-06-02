import { Actor } from '../../definition/Actor/Actor';
import { AssetDesc } from '../Asset/AssetDesc';

export interface ActorStateDesc {
    assets: AssetDesc[];
    actor: Actor;
    mode?: string;
}
