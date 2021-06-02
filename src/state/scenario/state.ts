import { ScenarioConfig } from '../../model/setup/ScenarioConfig';
import { SidebarTab } from '../../ui/components/Sidebar/SidebarTab';

export interface RootState {
    scenario: ScenarioConfig;
    showMeta: boolean;

    selectedActorId?: string;
    selectedStepId?: string;
    activeStepId?: string;

    snackbarOn: boolean;
    activeSidebarTab: SidebarTab;
}
