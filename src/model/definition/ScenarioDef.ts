import { PlainAction } from '../game/Action/PlainAction';
import { ActorConfig } from './ActorConfig';
import { ScenarioMeta } from './ScenarioMeta';

/** Complete definition of a user-defined scenario */
export interface ScenarioDef {
    /** The scenario meta data */
    meta: ScenarioMeta;
    /** The actor's and their initial assets */
    actors: ActorConfig[];
    /** All steps of this scenario */
    steps: PlainAction[];
}
