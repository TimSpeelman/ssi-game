import { ScenarioProps } from '../../data/scenario/Scenario';

export interface ScenarioState {
    scenario: ScenarioProps;

    selectedActorId?: string;
    selectedStepId?: string;
    activeStepId?: string;

    snackbarOn: boolean;
}
