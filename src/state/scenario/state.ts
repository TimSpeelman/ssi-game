import { ScenarioProps } from '../../model/game/Scenario';

export interface RootState {
    scenario: ScenarioProps;

    selectedActorId?: string;
    selectedStepId?: string;
    activeStepId?: string;

    snackbarOn: boolean;
}
