import { InteractionDescription } from '../../content/actions/InteractionDescription';
import { OutcomeDescription } from './OutcomeDescription';
import { ScenarioStateDescription } from './ScenarioStateDescription';
import { ValidationResultDesc } from './ValidationResultDesc';

/** A ScenarioStep is an Action which has some Outcomes and produces a new ScenarioState */
export interface ScenarioStepDescription {
    success: boolean;
    action: InteractionDescription;
    validation: ValidationResultDesc[];
    outcomes: OutcomeDescription[];
    result: ScenarioStateDescription;
}
