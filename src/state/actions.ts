import { Language } from '../intl/Language';
import { ScenarioDef } from '../model/definition/Scenario/ScenarioDef';
import { PersistedProject, PersistedState } from '../persistence/persistence';
import { SidebarTab } from '../ui/components/Sidebar/SidebarTab';
import { checkActionCreatorsRecord, event } from '../util/redux';
import { GameState } from './state';

export const GameActions = {
    // State Management
    SET_GAME_STATE: event<{ state: GameState }>('SET_GAME_STATE'),
    RESTORE_PERSISTED_STATE: event<{ state: PersistedState }>('RESTORE_PERSISTED_STATE'),

    // Project Management
    LOAD_PROJECT: event<{ project: PersistedProject }>('LOAD_PROJECT'),
    CREATE_PROJECT: event<{ id: string; name?: string; definition?: ScenarioDef }>('CREATE_PROJECT'),
    COPY_ACTIVE_PROJECT: event<{ id: string; name: string }>('COPY_ACTIVE_PROJECT'),
    DELETE_PROJECT: event<{ id: string }>('DELETE_PROJECT'),
    ACTIVATE_PROJECT: event<{ id: string }>('ACTIVATE_PROJECT'),

    // Language
    SET_LANGUAGE: event<{ language: Language }>('SET_LANGUAGE'),

    // Sidebar Navigation
    NAVIGATE_SIDEBAR: event<{ to: SidebarTab }>('NAVIGATE_SIDEBAR'),

    // Displays
    HIDE_PROJECT_DRAWER: event<void>('HIDE_PROJECT_DRAWER'),
    SHOW_PROJECT_DRAWER: event<void>('SHOW_PROJECT_DRAWER'),
    HIDE_MANUAL: event<void>('HIDE_MANUAL'),
    SHOW_MANUAL: event<void>('SHOW_MANUAL'),

    // UI Settings
    TOGGLE_SNACKBAR: event<void>('TOGGLE_SNACKBAR'),
    TOGGLE_EDITING: event<{ editing?: boolean }>('TOGGLE_EDITING'),

    // Highlighting
    HIGHLIGHT_RESOURCE: event<{ resourceId: string }>('HIGHLIGHT_RESOURCE'),
    UNHIGHLIGHT_RESOURCE: event<{ resourceId: string }>('UNHIGHLIGHT_RESOURCE'),
};

checkActionCreatorsRecord(GameActions);
