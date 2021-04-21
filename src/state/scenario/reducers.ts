import { ScenarioProps } from '../../data/scenario/Scenario';
import { IAction, ReducerMap } from '../../util/redux';
import { omit } from '../../util/util';
import { ScenarioActions } from './actions';
import { defaultState, emptyState } from './default';

const ScenarioReducers: ReducerMap<ScenarioProps, typeof ScenarioActions> = {
    ADD_STEP: (p) => (s): ScenarioProps => ({ ...s, steps: [...s.steps, p.step] }),
    REMOVE_STEP: (p) => (s): ScenarioProps => ({ ...s, steps: s.steps.filter((a, i) => i !== p.index) }),
    ADD_ACTOR: (p) => (s): ScenarioProps => ({
        ...s,
        initial: { ...s.initial, actors: { ...s.initial.actors, [p.actor.id]: { actor: p.actor, assets: [] } } },
    }),
    REMOVE_ACTOR: (p) => (s): ScenarioProps => ({
        ...s,
        initial: { ...s.initial, actors: omit(p.id)(s.initial.actors) },
    }),
    RESET: (p) => (s) => defaultState,
    CLEAR: (p) => (s) => emptyState,
};

export function ScenarioReducer(s: ScenarioProps, e: IAction<any>) {
    const r = e.type in ScenarioReducers ? ScenarioReducers[e.type as keyof typeof ScenarioReducers] : undefined;
    return r ? r(e.payload)(s) : s;
}
