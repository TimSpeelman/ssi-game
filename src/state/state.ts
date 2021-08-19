import { StateWithHistory } from 'redux-undo';
import { Language } from '../intl/Language';
import { SidebarTab } from '../ui/components/Sidebar/SidebarTab';
import { ProjectState } from './project/state';

export interface GameState {
    inactiveProjects: StateWithHistory<ProjectState>[];
    activeProject: StateWithHistory<ProjectState>;

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
