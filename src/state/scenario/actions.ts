import { PlainAction } from '../../model/game/Action/PlainAction';
import { ActorDefinition } from '../../model/game/Actor/ActorDefinition';
import { ActorConfig, ScenarioConfig, ScenarioMeta, ScenarioProps } from '../../model/game/Scenario/Scenario';
import { SidebarTab } from '../../ui/components/Sidebar/SidebarTab';
import { event } from '../../util/redux';

export const ScenarioActions = {
    NAVIGATE_SIDEBAR: event<{ to: SidebarTab }>('NAVIGATE_SIDEBAR'),

    SET_SCENARIO: event<{ scenario: ScenarioProps }>('SET_SCENARIO'),
    SET_SCENARIO_CONFIG: event<{ config: ScenarioConfig }>('SET_SCENARIO_CONFIG'),

    ADD_ACTOR: event<{ actor: ActorConfig }>('ADD_ACTOR'),
    REMOVE_ACTOR: event<{ id: string }>('REMOVE_ACTOR'),
    UPDATE_ACTOR_DEFINITION: event<{ def: ActorDefinition }>('UPDATE_ACTOR_DEFINITION'),
    ADD_STEP: event<{ step: PlainAction<any> }>('ADD_STEP'),
    UPDATE_STEP: event<{ step: PlainAction<any> }>('UPDATE_STEP'),
    REMOVE_STEP: event<{ id: string }>('REMOVE_STEP'),
    REORDER_STEP: event<{ sourceIndex: number; targetIndex: number }>('REORDER_STEP'),

    RESET: event<void>('RESET'),
    CLEAR: event<void>('CLEAR'),

    SELECT_ACTOR: event<{ id: string }>('SELECT_ACTOR'),
    SELECT_STEP: event<{ id: string }>('SELECT_STEP'),
    CLEAR_SELECTION: event<void>('CLEAR_SELECTION'),

    GOTO_STEP: event<{ id: string | undefined }>('GOTO_STEP'),
    NEXT_STEP: event<void>('NEXT_STEP'),
    PREV_STEP: event<void>('PREV_STEP'),

    TOGGLE_SNACKBAR: event<void>('TOGGLE_SNACKBAR'),

    SHOW_META: event<void>('SHOW_META'),
    HIDE_META: event<void>('HIDE_META'),
    CHANGE_META: event<{ meta: ScenarioMeta }>('CHANGE_META'),
};
