import { ScenarioProps } from '../../model/game/Scenario/Scenario';
import { SidebarTab } from '../../ui/components/Sidebar/SidebarTab';

export interface RootState {
    scenario: ScenarioProps;
    showMeta: boolean;

    selectedActorId?: string;
    selectedStepId?: string;
    activeStepId?: string;

    snackbarOn: boolean;
    activeSidebarTab: SidebarTab;
}
