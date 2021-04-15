import { event } from '../../util/redux';
import { Interaction } from '../action/Interaction';
import { Actor } from '../actor/Actor';

export const ScenarioActions = {
    ADD_ACTOR: event<{ actor: Actor }>('ADD_ACTOR'),
    REMOVE_ACTOR: event<{ id: string }>('REMOVE_ACTOR'),
    ADD_ACTIVITY: event<{ activity: Interaction }>('ADD_ACTIVITY'),
    REMOVE_ACTIVITY: event<{ index: number }>('REMOVE_ACTIVITY'),
};
