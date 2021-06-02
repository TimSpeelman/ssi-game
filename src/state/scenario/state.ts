import { ScenarioDef } from '../../model/definition/ScenarioDef';
import { SidebarTab } from '../../ui/components/Sidebar/SidebarTab';

export interface RootState {
    scenario: ScenarioDef;
    showMeta: boolean;

    selectedActorId?: string;
    selectedStepId?: string;
    activeStepId?: string;

    snackbarOn: boolean;
    activeSidebarTab: SidebarTab;
}
