import { Language } from '../intl/Language';
import { SidebarTab } from '../ui/components/Sidebar/SidebarTab';
import { defaultProjectState } from './project/default';
import { GameState } from './state';

export const defaultState: GameState = {
    inactiveProjects: [],
    activeProject: defaultProjectState,
    snackbarOn: false,
    projectDrawerOpen: false,
    activeSidebarTab: SidebarTab.TIMELINE,
    language: Language.NL,
    userManualOpen: false,
    editing: true,
};
