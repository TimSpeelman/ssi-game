import { lens } from 'lens.ts';
import { ReducerMap } from '../../util/redux';
import { cascadeRemove, reorder } from '../../util/util';
import { ProjectActions } from './actions';
import { ProjectState } from './state';

const L = lens<ProjectState>();

export const ProjectReducers: ReducerMap<ProjectState, typeof ProjectActions> = {
    RENAME_PROJECT: (p) => L.name.set(p.name),

    // Definition
    SET_SCENARIO: (p) => L.scenario.set(p.scenario),
    SET_ACTORS: (p) => L.scenario.actors.set(p.actors),

    // Definition Manipulation : Actors
    ADD_ACTOR: (p) => L.scenario.actors.set((actors) => [...actors, p.actor]),
    REMOVE_ACTOR: (p) => L.scenario.actors.set((actors) => actors.filter((a) => a.definition.id !== p.id)),
    REORDER_ACTORS: (p) => L.scenario.actors.set((actors) => reorder(actors, p.sourceIndex, p.targetIndex)),
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
    REORDER_STEPS: (p) => L.scenario.steps.set((steps) => reorder(steps, p.sourceIndex, p.targetIndex)),
    UPDATE_STEP: (p) => L.scenario.steps.set((steps) => steps.map((s) => (s.id === p.step.id ? p.step : s))),

    // Definition Manipulation : Meta
    CHANGE_META: (p) => L.scenario.meta.set(p.meta),

    // Selection
    CLEAR_SELECTION: (p) =>
        L.set((s) => ({
            ...s,
            selectedStepId: undefined,
            selectedActorId: undefined,
            selectedAssetId: undefined,
        })),
    SELECT_ACTOR: (p) =>
        L.set((s) => ({
            ...s,
            selectedStepId: undefined,
            selectedActorId: p.id,
            selectedAssetId: undefined,
        })),
    SELECT_ASSET: (p) =>
        L.set((s) => ({
            ...s,
            selectedStepId: undefined,
            selectedActorId: undefined,
            selectedAssetId: p.id,
        })),
    SELECT_STEP: (p) =>
        L.set((s) => ({
            ...s,
            selectedStepId: p.id,
            selectedActorId: undefined,
            selectedAssetId: undefined,
        })),

    // Sequence Navigation
    GOTO_STEP: (p) => L.activeStepId!.set(p.id),
    GOTO_STEP_INDEX: (p) =>
        L.set((s) => {
            const steps = s.scenario.steps;
            const goto = Math.max(-1, Math.min(p.index - 1, steps.length - 1));
            return { ...s, activeStepId: goto === -1 ? undefined : steps[goto].id };
        }),
    NEXT_STEP: (p) =>
        L.set((s) => {
            const activeIndex = s.activeStepId ? s.scenario.steps.findIndex((step) => step.id === s.activeStepId) : -1;
            const numberOfSteps = s.scenario.steps.length;
            const nextIndex = activeIndex >= numberOfSteps - 1 ? -1 : activeIndex + 1;
            const nextId = nextIndex < 0 ? undefined : s.scenario.steps[nextIndex].id;
            return { ...s, activeStepId: nextId };
        }),
    PREV_STEP: (p) =>
        L.set((s) => {
            const firstId = s.scenario.steps[0];
            const activeIndex = s.activeStepId ? s.scenario.steps.findIndex((step) => step.id === s.activeStepId) : -1;
            const numberOfSteps = s.scenario.steps.length;
            const nextIndex = activeIndex === -1 ? numberOfSteps - 1 : activeIndex - 1;
            const nextId = nextIndex < 0 ? undefined : s.scenario.steps[nextIndex].id;
            return { ...s, activeStepId: nextId };
        }),
    FIRST_STEP: (p) => L.activeStepId!.set(undefined),
    LAST_STEP: (p) =>
        L.set((s) => {
            const steps = s.scenario.steps;
            const lastStep = steps.length === 0 ? undefined : steps[steps.length - 1].id;
            return { ...s, activeStepId: lastStep };
        }),

    // Display Meta Dialog
    HIDE_META: () => L.showMeta.set(false),
    SHOW_META: () => L.showMeta.set(true),
};
