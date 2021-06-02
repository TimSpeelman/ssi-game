import { Asset } from '../../content/assets/Asset';
import { ActorDefinition } from '../game/Actor/ActorDefinition';

/** A user definition of an actor and the initial assets it has */
export interface ActorConfig {
    definition: ActorDefinition;
    initialAssets: Asset[];
}
