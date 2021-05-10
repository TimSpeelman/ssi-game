import { lens } from 'lens.ts';
import { IAction, ReducerMap } from '../../util/redux';
import { reorder } from '../../util/util';
import { ScenarioActions } from './actions';
import { defaultScenario, emptyScenario } from './default';
import { RootState } from './state';

const L = lens<RootState>();

const ScenarioReducers: ReducerMap<RootState, typeof ScenarioActions> = {
    SET_SCENARIO: (p) => L.scenario.set(p.scenario),

    ADD_STEP: (p) => L.scenario.steps.set((steps) => [...steps, p.step]),

    REMOVE_STEP: (p) => L.scenario.steps.set((steps) => steps.filter((a) => a.id !== p.id)),

    ADD_ACTOR: (p) => L.scenario.initial.set((initial) => initial.withActor(p.actor)),
    //  L.scenario.initial.actors.k(p.actor.id).set({ actor: p.actor, assets: [] }),

    REMOVE_ACTOR: (p) => L.scenario.initial.set((initial) => initial.withoutActor(p.id)),

    REORDER_STEP: (p) => L.scenario.steps.set((steps) => reorder(steps, p.sourceIndex, p.targetIndex)),

    RESET: (p) => L.scenario.set(defaultScenario),
    CLEAR: (p) => L.scenario.set(emptyScenario),

    SELECT_ACTOR: (p) => (s): RootState => ({ ...s, selectedStepId: undefined, selectedActorId: p.id }),
    SELECT_STEP: (p) => (s): RootState => ({ ...s, selectedStepId: p.id, selectedActorId: undefined }),
    CLEAR_SELECTION: (p) => (s): RootState => ({ ...s, selectedStepId: undefined, selectedActorId: undefined }),

    GOTO_STEP: (p) => L.activeStepId!.set(p.id),
    NEXT_STEP: (p) => (s): RootState => {
        const activeIndex = s.activeStepId ? s.scenario.steps.findIndex((step) => step.id === s.activeStepId) : -1;
        const numberOfSteps = s.scenario.steps.length;
        const nextIndex = activeIndex >= numberOfSteps - 1 ? -1 : activeIndex + 1;
        const nextId = nextIndex < 0 ? undefined : s.scenario.steps[nextIndex].id;
        return { ...s, activeStepId: nextId };
    },
    PREV_STEP: (p) => (s): RootState => {
        const activeIndex = s.activeStepId ? s.scenario.steps.findIndex((step) => step.id === s.activeStepId) : -1;
        const numberOfSteps = s.scenario.steps.length;
        const nextIndex = activeIndex === -1 ? numberOfSteps - 1 : activeIndex - 1;
        const nextId = nextIndex < 0 ? undefined : s.scenario.steps[nextIndex].id;
        return { ...s, activeStepId: nextId };
    },

    TOGGLE_SNACKBAR: (p) => L.snackbarOn.set((on) => !on),

    CHANGE_META: (p) => L.scenario.meta.set(p.meta),
    SHOW_META: () => L.showMeta.set(true),
    HIDE_META: () => L.showMeta.set(false),
};

export function ScenarioReducer(s: RootState, e: IAction<any>) {
    const r = e.type in ScenarioReducers ? ScenarioReducers[e.type as keyof typeof ScenarioReducers] : undefined;
    return r ? r(e.payload)(s) : s;
}
