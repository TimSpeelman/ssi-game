import { ActorConfig } from './ActorConfig';
import { ScenarioMeta } from './ScenarioMeta';

/** A user's configuration of a scenario */
export interface ScenarioConfig {
    meta: ScenarioMeta;
    actors: ActorConfig[];
}
