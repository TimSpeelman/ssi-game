import { ScenarioProps } from '../../model/game/Scenario';

export interface RootState {
    scenario: ScenarioProps;
    showMeta: boolean;

    selectedActorId?: string;
    selectedStepId?: string;
    activeStepId?: string;

    snackbarOn: boolean;
}
