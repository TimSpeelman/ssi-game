import { PlainAction } from '../game/Action/PlainAction';
import { ActorConfig } from './ActorConfig';
import { ScenarioMeta } from './ScenarioMeta';

/** Complete definition of a user-defined scenario */
export interface ScenarioDef {
    meta: ScenarioMeta;
    actors: ActorConfig[];
    steps: PlainAction[];
}
