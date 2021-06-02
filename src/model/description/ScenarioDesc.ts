import { ScenarioDef } from '../definition/ScenarioDef';
import { StateDesc } from './StateDesc';
import { StepDesc } from './StepDesc';

/** Describes a computed scenario */
export interface ScenarioDesc {
    definition: ScenarioDef;
    initial: StateDesc;
    steps: StepDesc[];
    failingAtIndex?: number;
}
