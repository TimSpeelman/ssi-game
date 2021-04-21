import { IAction } from '../../data/action/IAction';
import { Actor } from '../../data/actor/Actor';
import { ScenarioProps } from '../../data/scenario/Scenario';
import { event } from '../../util/redux';

export const ScenarioActions = {
    SET_SCENARIO: event<{ scenario: ScenarioProps }>('SET_SCENARIO'),

    ADD_ACTOR: event<{ actor: Actor }>('ADD_ACTOR'),
    REMOVE_ACTOR: event<{ id: string }>('REMOVE_ACTOR'),
    ADD_STEP: event<{ step: IAction }>('ADD_STEP'),
    REMOVE_STEP: event<{ id: string }>('REMOVE_STEP'),

    RESET: event<void>('RESET'),
    CLEAR: event<void>('CLEAR'),

    SELECT_ACTOR: event<{ id: string }>('SELECT_ACTOR'),
    SELECT_STEP: event<{ id: string }>('SELECT_STEP'),
    CLEAR_SELECTION: event<void>('CLEAR_SELECTION'),

    GOTO_STEP: event<{ id: string }>('GOTO_STEP'),
    NEXT_STEP: event<void>('NEXT_STEP'),
    PREV_STEP: event<void>('PREV_STEP'),

    TOGGLE_SNACKBAR: event<void>('TOGGLE_SNACKBAR'),
};
