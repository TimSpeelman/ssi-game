import { Language } from '../intl/Language';
import { ScenarioDef } from '../model/definition/Scenario/ScenarioDef';
import { PersistedProject, PersistedState } from '../persistence/persistence';
import { SidebarTab } from '../ui/components/Sidebar/SidebarTab';
import { checkActionCreatorsRecord, event } from '../util/redux';

export const GameActions = {
    RESTORE_STATE: event<{ state: PersistedState }>('RESTORE_STATE'),
    LOAD_PROJECT: event<{ project: PersistedProject }>('LOAD_PROJECT'),

    ACTIVATE_PROJECT: event<{ id: string }>('ACTIVATE_PROJECT'),
    NEW_PROJECT: event<{ id: string; definition?: ScenarioDef }>('NEW_PROJECT'),
    COPY_ACTIVE_PROJECT: event<{ id: string; name: string }>('COPY_ACTIVE_PROJECT'),

    DELETE_PROJECT: event<{ id: string }>('DELETE_PROJECT'),

    SET_LANGUAGE: event<{ language: Language }>('SET_LANGUAGE'),

    // Sidebar Navigation
    NAVIGATE_SIDEBAR: event<{ to: SidebarTab }>('NAVIGATE_SIDEBAR'),
    NAVIGATE_TO_RESOURCE: event<{ resourceId: string }>('NAVIGATE_TO_RESOURCE'),

    OPEN_PROJECT_DRAWER: event<void>('OPEN_PROJECT_DRAWER'),
    CLOSE_PROJECT_DRAWER: event<void>('CLOSE_PROJECT_DRAWER'),

    // Options
    TOGGLE_SNACKBAR: event<void>('TOGGLE_SNACKBAR'),

    HIGHLIGHT_RESOURCE: event<{ resourceId: string }>('HIGHLIGHT_RESOURCE'),
    UNHIGHLIGHT_RESOURCE: event<{ resourceId: string }>('UNHIGHLIGHT_RESOURCE'),

    // Display User Manual Dialog
    HIDE_MANUAL: event<void>('HIDE_MANUAL'),
    SHOW_MANUAL: event<void>('SHOW_MANUAL'),
};

checkActionCreatorsRecord(GameActions);
