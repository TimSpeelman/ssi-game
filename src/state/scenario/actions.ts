import { Language } from '../../intl/Language';
import { ActionDef } from '../../model/definition/Action/ActionDef';
import { ActorConfig } from '../../model/definition/Actor/ActorConfig';
import { ActorDefinition } from '../../model/definition/Actor/ActorDefinition';
import { AssetDef } from '../../model/definition/Asset/AssetDef';
import { ScenarioDef } from '../../model/definition/ScenarioDef';
import { ScenarioMeta } from '../../model/definition/ScenarioMeta';
import { SidebarTab } from '../../ui/components/Sidebar/SidebarTab';
import { event } from '../../util/redux';
import { PersistedProject, PersistedState } from './persistence';

export const ProjectActions = {
    RENAME_PROJECT: event<{ name: string }>('RENAME_PROJECT'),
    CLEAR: event<void>('CLEAR', true),
    RESET: event<void>('RESET', true),
    SET_SCENARIO: event<{ scenario: ScenarioDef }>('SET_SCENARIO'),
    SET_ACTORS: event<{ actors: ActorConfig[] }>('SET_ACTORS', true),

    // Definition Manipulation : Actors
    ADD_ACTOR: event<{ actor: ActorConfig }>('ADD_ACTOR', true),
    REMOVE_ACTOR: event<{ id: string }>('REMOVE_ACTOR', true),
    REORDER_ACTORS: event<{ sourceIndex: number; targetIndex: number }>('REORDER_ACTORS', true),
    UPDATE_ACTOR_DEFINITION: event<{ def: ActorDefinition }>('UPDATE_ACTOR_DEFINITION', true),

    // Definition Manipulation : Assets
    ADD_ASSET: event<{ actorId: string; asset: AssetDef }>('ADD_ASSET', true),
    UPDATE_ASSET: event<{ actorId: string; asset: AssetDef }>('UPDATE_ASSET', true),
    REMOVE_ASSET: event<{ actorId: string; id: string }>('REMOVE_ASSET', true),

    // Definition Manipulation : Steps
    ADD_STEP: event<{ step: ActionDef<any> }>('ADD_STEP', true),
    REMOVE_STEP: event<{ id: string }>('REMOVE_STEP', true),
    REORDER_STEPS: event<{ sourceIndex: number; targetIndex: number }>('REORDER_STEPS', true),
    UPDATE_STEP: event<{ step: ActionDef<any> }>('UPDATE_STEP', true),

    // Definition Manipulation : Meta
    CHANGE_META: event<{ meta: ScenarioMeta }>('CHANGE_META', true),

    // Selection
    CLEAR_SELECTION: event<void>('CLEAR_SELECTION'),
    SELECT_ACTOR: event<{ id: string }>('SELECT_ACTOR'),
    SELECT_ASSET: event<{ id: string }>('SELECT_ASSET'),
    SELECT_STEP: event<{ id: string }>('SELECT_STEP'),

    // Sequence Navigation
    GOTO_STEP: event<{ id: string | undefined }>('GOTO_STEP'),
    GOTO_STEP_INDEX: event<{ index: number }>('GOTO_STEP_INDEX'),
    NEXT_STEP: event<void>('NEXT_STEP'),
    PREV_STEP: event<void>('PREV_STEP'),
    FIRST_STEP: event<void>('FIRST_STEP'),
    LAST_STEP: event<void>('LAST_STEP'),

    // Display Meta Dialog
    HIDE_META: event<void>('HIDE_META'),
    SHOW_META: event<void>('SHOW_META'),
};

export const ScenarioActions = {
    RESTORE_STATE: event<{ state: PersistedState }>('RESTORE_STATE'),
    LOAD_PROJECT: event<{ project: PersistedProject }>('LOAD_PROJECT'),

    ACTIVATE_PROJECT: event<{ id: string }>('ACTIVATE_PROJECT'),
    NEW_PROJECT: event<{ id: string }>('NEW_PROJECT'),
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
