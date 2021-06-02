import { ScenarioDef } from '../definition/ScenarioDef';
import { ScenarioStateDescription } from '../view/ScenarioStateDescription';
import { ScenarioStepDescription } from '../view/ScenarioStepDescription';

/** A Scenario Description describes the entire computed scenario */
export interface ScenarioDesc {
    definition: ScenarioDef;
    initial: ScenarioStateDescription;
    steps: ScenarioStepDescription[];
    failingAtIndex?: number;
}
