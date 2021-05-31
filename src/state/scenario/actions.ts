import { Action } from '../../model/game/Action';
import { Actor } from '../../model/game/Actor';
import { ScenarioConfig, ScenarioMeta, ScenarioProps } from '../../model/game/Scenario';
import { event } from '../../util/redux';

export const ScenarioActions = {
    SET_SCENARIO: event<{ scenario: ScenarioProps }>('SET_SCENARIO'),
    SET_SCENARIO_CONFIG: event<{ config: ScenarioConfig }>('SET_SCENARIO_CONFIG'),

    ADD_ACTOR: event<{ actor: Actor }>('ADD_ACTOR'),
    REMOVE_ACTOR: event<{ id: string }>('REMOVE_ACTOR'),
    ADD_STEP: event<{ step: Action }>('ADD_STEP'),
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
