import { event } from '../../util/redux';
import { IAction } from '../action/IAction';
import { Actor } from '../actor/Actor';

export const ScenarioActions = {
    ADD_ACTOR: event<{ actor: Actor }>('ADD_ACTOR'),
    REMOVE_ACTOR: event<{ id: string }>('REMOVE_ACTOR'),
    ADD_STEP: event<{ step: IAction }>('ADD_STEP'),
    REMOVE_STEP: event<{ index: number }>('REMOVE_STEP'),
};
