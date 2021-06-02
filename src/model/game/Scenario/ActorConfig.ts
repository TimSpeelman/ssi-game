import { Asset } from '../../../content/assets/Asset';
import { ActorDefinition } from '../Actor/ActorDefinition';

export interface ActorConfig {
    definition: ActorDefinition;
    initialAssets: Asset[];
}
