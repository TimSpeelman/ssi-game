import { ScenarioProps } from '../../model/game/Scenario';

export interface ScenarioState {
    scenario: ScenarioProps;

    selectedActorId?: string;
    selectedStepId?: string;
    activeStepId?: string;

    snackbarOn: boolean;
}
