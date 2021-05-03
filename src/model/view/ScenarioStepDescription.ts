import { InteractionDescription } from '../../content/actions/InteractionDescription';
import { OutcomeDescription } from './OutcomeDescription';
import { ScenarioStateDescription } from './ScenarioStateDescription';

/** A ScenarioStep is an Action which has some Outcomes and produces a new ScenarioState */
export interface ScenarioStepDescription {
    action: InteractionDescription;
    outcomes: OutcomeDescription[];
    result: ScenarioStateDescription;
}
