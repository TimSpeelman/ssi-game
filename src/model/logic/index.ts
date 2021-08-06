import { DefaultLibrary } from '../../content';
import { ScenarioDef } from '../definition/Scenario/ScenarioDef';
import { ScenarioDesc } from '../description/Scenario/ScenarioDesc';
import { Scenario } from './Scenario/Scenario';

/** Based on a user's definition, we compute an entire scenario. */
export function computeScenarioFromDefinition(definition: ScenarioDef): ScenarioDesc {
    return new Scenario(definition, DefaultLibrary).describe();
}
