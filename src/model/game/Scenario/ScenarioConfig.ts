import { ActorConfig } from './ActorConfig';
import { ScenarioMeta } from './ScenarioMeta';

export interface ScenarioConfig {
    meta: ScenarioMeta;
    actors: ActorConfig[];
}
