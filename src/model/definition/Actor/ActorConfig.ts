import { AssetDef } from '../Asset/AssetDef';
import { ActorDefinition } from './ActorDefinition';

/** A user definition of an actor and the initial assets it has */
export interface ActorConfig {
    definition: ActorDefinition;
    initialAssets: AssetDef[];
}
