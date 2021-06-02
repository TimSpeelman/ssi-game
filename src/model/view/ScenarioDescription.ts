import { ScenarioMeta } from '../definition/ScenarioMeta';
import { ScenarioStateDescription } from './ScenarioStateDescription';
import { ScenarioStepDescription } from './ScenarioStepDescription';

/** A Scenario is described as a set of steps starting from an initial state */
export interface ScenarioDescription {
    initial: ScenarioStateDescription;
    meta: ScenarioMeta;
    steps: ScenarioStepDescription[];
    failingAtIndex?: number;
}
