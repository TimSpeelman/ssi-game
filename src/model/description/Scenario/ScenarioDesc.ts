import { ScenarioDef } from '../../definition/Scenario/ScenarioDef';
import { StateDesc } from '../State/StateDesc';
import { StepDesc } from '../Step/StepDesc';

/** Describes a computed scenario */
export interface ScenarioDesc {
    definition: ScenarioDef;
    initial: StateDesc;
    steps: StepDesc[];
    failingAtIndex?: number;
}
