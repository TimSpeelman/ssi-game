import { AssetDef } from '../Asset/AssetDef';
import { ActorDef } from './ActorDef';

/** A user definition of an actor and the initial assets it has */
export interface ActorConfig {
    definition: ActorDef;
    initialAssets: AssetDef[];
}
