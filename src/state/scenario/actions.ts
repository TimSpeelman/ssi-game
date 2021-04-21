import { IAction } from '../../data/action/IAction';
import { Actor } from '../../data/actor/Actor';
import { event } from '../../util/redux';

export const ScenarioActions = {
    ADD_ACTOR: event<{ actor: Actor }>('ADD_ACTOR'),
    REMOVE_ACTOR: event<{ id: string }>('REMOVE_ACTOR'),
    ADD_STEP: event<{ step: IAction }>('ADD_STEP'),
    REMOVE_STEP: event<{ index: number }>('REMOVE_STEP'),
    RESET: event<void>('RESET'),
    CLEAR: event<void>('CLEAR'),
};
