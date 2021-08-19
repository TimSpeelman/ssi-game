import { newHistory } from 'redux-undo';
import { Language } from '../intl/Language';
import { SidebarTab } from '../ui/components/Sidebar/SidebarTab';
import { defaultProjectState } from './project/default';
import { RootState } from './state';

export const defaultState: RootState = {
    inactiveProjects: [],
    activeProject: newHistory([], defaultProjectState, []),
    snackbarOn: false,
    projectDrawerOpen: false,
    activeSidebarTab: SidebarTab.TIMELINE,
    language: Language.NL,
    userManualOpen: false,
    editing: false,
};
