import { StateWithHistory } from 'redux-undo';
import { Language } from '../intl/Language';
import { SidebarTab } from '../ui/components/Sidebar/SidebarTab';
import { ProjectState } from './project/state';

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
