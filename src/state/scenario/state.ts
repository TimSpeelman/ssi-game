import { StateWithHistory } from 'redux-undo';
import { Language } from '../../intl/Language';
import { ScenarioDef } from '../../model/definition/ScenarioDef';
import { SidebarTab } from '../../ui/components/Sidebar/SidebarTab';

export interface RootState {
    inactiveProjects: StateWithHistory<ProjectState>[];
    activeProject: StateWithHistory<ProjectState>;

    snackbarOn: boolean;
    activeSidebarTab: SidebarTab;
    projectDrawerOpen: boolean;

    language: Language;
    highlightedResourceId?: string;
    userManualOpen: boolean;
}

export interface ProjectState {
    id: string;
    name: string;
    scenario: ScenarioDef;
    showMeta: boolean;

    selectedActorId?: string;
    selectedAssetId?: string;
    selectedStepId?: string;
    activeStepId?: string;
}
