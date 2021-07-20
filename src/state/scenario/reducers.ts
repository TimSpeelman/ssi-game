import { lens } from 'lens.ts';
import { IAction, ReducerMap } from '../../util/redux';
import { cascadeRemove, reorder } from '../../util/util';
import { ScenarioActions } from './actions';
import { defaultScenario, emptyScenario } from './default';
import { RootState } from './state';

const L = lens<RootState>();

const ScenarioReducers: ReducerMap<RootState, typeof ScenarioActions> = {
    SET_LANGUAGE: (p) => L.language.set(p.language),

    // Definition
    CLEAR: (p) => L.scenario.set(emptyScenario),
    RESET: (p) => L.scenario.set(defaultScenario),
    SET_SCENARIO: (p) => L.scenario.set(p.scenario),

    // Definition Manipulation : Actors
    ADD_ACTOR: (p) => L.scenario.actors.set((actors) => [...actors, p.actor]),
    REMOVE_ACTOR: (p) => L.scenario.actors.set((actors) => actors.filter((a) => a.definition.id !== p.id)),
    UPDATE_ACTOR_DEFINITION: (p) =>
        L.scenario.actors.set((actors) =>
            actors.map((a) => (a.definition.id === p.def.id ? { ...a, definition: p.def } : a)),
        ),

    // Definition Manipulation : Asset
    ADD_ASSET: (p) =>
        L.scenario.actors.set((actors) =>
            actors.map((a) =>
                a.definition.id === p.actorId ? { ...a, initialAssets: [...a.initialAssets, p.asset] } : a,
            ),
        ),
    UPDATE_ASSET: (p) =>
        L.scenario.actors.set((actors) =>
            actors.map((a) =>
                a.definition.id === p.actorId
                    ? { ...a, initialAssets: a.initialAssets.map((a) => (a.id === p.asset.id ? p.asset : a)) }
                    : a,
            ),
        ),
    REMOVE_ASSET: (p) =>
        L.scenario.actors.set((actors) =>
            actors.map((a) =>
                a.definition.id === p.actorId
                    ? {
                          ...a,
                          initialAssets: cascadeRemove(
                              p.id,
                              a.initialAssets,
                              (a) => a.id,
                              (a) => a.props.parentId,
                          ),
                      }
                    : a,
            ),
        ),

    // Definition Manipulation : Steps
    ADD_STEP: (p) => L.scenario.steps.set((steps) => [...steps, p.step]),
    REMOVE_STEP: (p) => L.scenario.steps.set((steps) => steps.filter((a) => a.id !== p.id)),
    REORDER_STEP: (p) => L.scenario.steps.set((steps) => reorder(steps, p.sourceIndex, p.targetIndex)),
    UPDATE_STEP: (p) => L.scenario.steps.set((steps) => steps.map((s) => (s.id === p.step.id ? p.step : s))),

    // Definition Manipulation : Meta
    CHANGE_META: (p) => L.scenario.meta.set(p.meta),

    // Selection
    CLEAR_SELECTION: (p) => (s): RootState => ({
        ...s,
        selectedStepId: undefined,
        selectedActorId: undefined,
        selectedAssetId: undefined,
    }),
    SELECT_ACTOR: (p) => (s): RootState => ({
        ...s,
        selectedStepId: undefined,
        selectedActorId: p.id,
        selectedAssetId: undefined,
    }),
    SELECT_ASSET: (p) => (s): RootState => ({
        ...s,
        selectedStepId: undefined,
        selectedActorId: undefined,
        selectedAssetId: p.id,
    }),
    SELECT_STEP: (p) => (s): RootState => ({
        ...s,
        selectedStepId: p.id,
        selectedActorId: undefined,
        selectedAssetId: undefined,
    }),

    // Sequence Navigation
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

    // Sidebar Navigation
    NAVIGATE_SIDEBAR: (p) => L.activeSidebarTab.set(p.to),
    NAVIGATE_TO_RESOURCE: (p) => (s: any) => s, // TODO FIXME
    HIGHLIGHT_RESOURCE: (p) => L.highlightedResourceId!.set(p.resourceId),
    UNHIGHLIGHT_RESOURCE: (p) => L.highlightedResourceId!.set((r) => (r === p.resourceId ? '' : r)),

    // Display Meta Dialog
    HIDE_META: () => L.showMeta.set(false),
    SHOW_META: () => L.showMeta.set(true),

    // Options
    TOGGLE_SNACKBAR: (p) => L.snackbarOn.set((on) => !on),
};

export function ScenarioReducer(s: RootState, e: IAction<any>) {
    const r = e.type in ScenarioReducers ? ScenarioReducers[e.type as keyof typeof ScenarioReducers] : undefined;
    return r ? r(e.payload)(s) : s;
}
