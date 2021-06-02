import { ActionDef } from '../../model/definition/Action/ActionDef';
import { ActorConfig } from '../../model/definition/Actor/ActorConfig';
import { ActorDefinition } from '../../model/definition/Actor/ActorDefinition';
import { AssetDef } from '../../model/definition/Asset/AssetDef';
import { ScenarioDef } from '../../model/definition/ScenarioDef';
import { ScenarioMeta } from '../../model/definition/ScenarioMeta';
import { SidebarTab } from '../../ui/components/Sidebar/SidebarTab';
import { event } from '../../util/redux';

export const ScenarioActions = {
    // Definition
    CLEAR: event<void>('CLEAR'),
    RESET: event<void>('RESET'),
    SET_SCENARIO: event<{ scenario: ScenarioDef }>('SET_SCENARIO'),

    // Definition Manipulation : Actors
    ADD_ACTOR: event<{ actor: ActorConfig }>('ADD_ACTOR'),
    REMOVE_ACTOR: event<{ id: string }>('REMOVE_ACTOR'),
    UPDATE_ACTOR_DEFINITION: event<{ def: ActorDefinition }>('UPDATE_ACTOR_DEFINITION'),

    // Definition Manipulation : Assets
    ADD_ASSET: event<{ actorId: string; asset: AssetDef }>('ADD_ASSET'),

    // Definition Manipulation : Steps
    ADD_STEP: event<{ step: ActionDef<any> }>('ADD_STEP'),
    REMOVE_STEP: event<{ id: string }>('REMOVE_STEP'),
    REORDER_STEP: event<{ sourceIndex: number; targetIndex: number }>('REORDER_STEP'),
    UPDATE_STEP: event<{ step: ActionDef<any> }>('UPDATE_STEP'),

    // Definition Manipulation : Meta
    CHANGE_META: event<{ meta: ScenarioMeta }>('CHANGE_META'),

    // Selection
    CLEAR_SELECTION: event<void>('CLEAR_SELECTION'),
    SELECT_ACTOR: event<{ id: string }>('SELECT_ACTOR'),
    SELECT_STEP: event<{ id: string }>('SELECT_STEP'),

    // Sequence Navigation
    GOTO_STEP: event<{ id: string | undefined }>('GOTO_STEP'),
    NEXT_STEP: event<void>('NEXT_STEP'),
    PREV_STEP: event<void>('PREV_STEP'),

    // Sidebar Navigation
    NAVIGATE_SIDEBAR: event<{ to: SidebarTab }>('NAVIGATE_SIDEBAR'),

    // Display Meta Dialog
    HIDE_META: event<void>('HIDE_META'),
    SHOW_META: event<void>('SHOW_META'),

    // Options
    TOGGLE_SNACKBAR: event<void>('TOGGLE_SNACKBAR'),
};
