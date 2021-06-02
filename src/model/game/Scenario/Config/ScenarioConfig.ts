import { ScenarioMeta } from '../ScenarioMeta';
import { ActorConfig } from './ActorConfig';

export interface ScenarioConfig {
    meta: ScenarioMeta;
    actors: ActorConfig[];
}
