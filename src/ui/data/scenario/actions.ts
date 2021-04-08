import { event } from '../../../util/redux';
import { Actor } from '../Actor';
import { IInteraction } from '../IInteraction';

export const ScenarioActions = {
    ADD_ACTOR: event<{ actor: Actor }>('ADD_ACTOR'),
    REMOVE_ACTOR: event<{ id: string }>('REMOVE_ACTOR'),
    ADD_ACTIVITY: event<{ activity: IInteraction }>('ADD_ACTIVITY'),
    REMOVE_ACTIVITY: event<{ index: number }>('REMOVE_ACTIVITY'),
};
