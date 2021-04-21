import { lens } from 'lens.ts';
import { IAction, ReducerMap } from '../../util/redux';
import { omit } from '../../util/util';
import { ScenarioActions } from './actions';
import { defaultScenario, emptyScenario } from './default';
import { ScenarioState } from './state';

const L = lens<ScenarioState>();

const ScenarioReducers: ReducerMap<ScenarioState, typeof ScenarioActions> = {
    SET_SCENARIO: (p) => L.scenario.set(p.scenario),

    ADD_STEP: (p) => L.scenario.steps.set((steps) => [...steps, p.step]),

    REMOVE_STEP: (p) => L.scenario.steps.set((steps) => steps.filter((a) => a.id !== p.id)),

    ADD_ACTOR: (p) => L.scenario.initial.actors.k(p.actor.id).set({ actor: p.actor, assets: [] }),

    REMOVE_ACTOR: (p) => L.scenario.initial.actors.set(omit(p.id)),

    RESET: (p) => L.scenario.set(defaultScenario),
    CLEAR: (p) => L.scenario.set(emptyScenario),

    SELECT_ACTOR: (p) => (s): ScenarioState => ({ ...s, selectedStepId: undefined, selectedActorId: p.id }),
    SELECT_STEP: (p) => (s): ScenarioState => ({ ...s, selectedStepId: p.id, selectedActorId: undefined }),
    CLEAR_SELECTION: (p) => (s): ScenarioState => ({ ...s, selectedStepId: undefined, selectedActorId: undefined }),

    GOTO_STEP: (p) => L.activeStepId!.set(p.id),
    NEXT_STEP: (p) => (s): ScenarioState => {
        const activeIndex = s.activeStepId ? s.scenario.steps.findIndex((step) => step.id === s.activeStepId) : -1;
        const numberOfSteps = s.scenario.steps.length;
        const nextIndex = activeIndex >= numberOfSteps - 1 ? -1 : activeIndex + 1;
        const nextId = nextIndex < 0 ? undefined : s.scenario.steps[nextIndex].id;
        return { ...s, activeStepId: nextId };
    },
    PREV_STEP: (p) => (s): ScenarioState => {
        const activeIndex = s.activeStepId ? s.scenario.steps.findIndex((step) => step.id === s.activeStepId) : -1;
        const numberOfSteps = s.scenario.steps.length;
        const nextIndex = activeIndex === -1 ? numberOfSteps - 1 : activeIndex - 1;
        const nextId = nextIndex < 0 ? undefined : s.scenario.steps[nextIndex].id;
        return { ...s, activeStepId: nextId };
    },

    TOGGLE_SNACKBAR: (p) => L.snackbarOn.set((on) => !on),
};

export function ScenarioReducer(s: ScenarioState, e: IAction<any>) {
    const r = e.type in ScenarioReducers ? ScenarioReducers[e.type as keyof typeof ScenarioReducers] : undefined;
    return r ? r(e.payload)(s) : s;
}