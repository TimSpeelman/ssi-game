import { IAction, ReducerMap } from '../../util/redux';
import { omit } from '../../util/util';
import { ScenarioActions } from './actions';
import { Scenario } from './Scenario';

const ScenarioReducers: ReducerMap<Scenario, typeof ScenarioActions> = {
    ADD_ACTIVITY: (p) => (s) => ({ ...s, activities: [...s.activities, p.activity] }),
    REMOVE_ACTIVITY: (p) => (s) => ({ ...s, activities: s.activities.filter((a, i) => i !== p.index) }),
    ADD_ACTOR: (p) => (s) => ({ ...s, actors: { ...s.actors, [p.actor.id]: { actor: p.actor, initialAssets: [] } } }),
    REMOVE_ACTOR: (p) => (s) => ({ ...s, actors: omit(p.id)(s.actors) }),
};

export function ScenarioReducer(s: Scenario, e: IAction<any>) {
    const r = e.type in ScenarioReducers ? ScenarioReducers[e.type as keyof typeof ScenarioReducers] : undefined;
    return r ? r(e.payload)(s) : s;
}
