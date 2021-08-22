import { Language } from '../intl/Language';
import { SidebarTab } from '../ui/components/Sidebar/SidebarTab';
import { ProjectStateWithHistory } from './project/state';

export interface GameState {
    inactiveProjects: ProjectStateWithHistory[];
    activeProject: ProjectStateWithHistory;

    snackbarOn: boolean;
    activeSidebarTab: SidebarTab;
    projectDrawerOpen: boolean;

    language: Language;
    highlightedResourceId?: string;
    userManualOpen: boolean;

    editing: boolean;
}

export interface RootState {
    scenario: GameState;
}
