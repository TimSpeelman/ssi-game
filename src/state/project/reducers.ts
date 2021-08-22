import { lens } from 'lens.ts';
import { ActorConfig } from '../../model/definition/Actor/ActorConfig';
import { ReducerMap } from '../../util/redux';
import { orderedMap } from '../../util/types/OrderedMap';
import { cascadeRemove, insertAt, reorder } from '../../util/util';
import { ProjectActions } from './actions';
import { ProjectState } from './state';

const L = lens<ProjectState>();

export const ProjectReducers: ReducerMap<ProjectState, typeof ProjectActions> = {
    RENAME_PROJECT: (p) => L.name.set(p.name),

    // Definition
    SET_SCENARIO: (p) => L.scenario.set(p.scenario),

    // Definition Manipulation : Actors
    ADD_ACTOR: (p) => L.scenario.actors.set(orderedMap.push<ActorConfig>(p.actor)),
    REMOVE_ACTOR: (p) => L.scenario.actors.set(orderedMap.dropById<ActorConfig>(p.id)),
    REORDER_ACTORS: (p) => L.scenario.actors.set(orderedMap.reorder<ActorConfig>(p.fromIndex, p.toIndex)),
    UPDATE_ACTOR_DEFINITION: (p) => L.scenario.actors.byId.k(p.def.id).definition.set(p.def),

    // Definition Manipulation : Asset
    ADD_ASSET: (p) => L.scenario.actors.byId.k(p.actorId).initialAssets.set((a) => [...a, p.asset]),
    UPDATE_ASSET: (p) =>
        L.scenario.actors.byId.k(p.actorId).initialAssets.set((a) => a.map((a) => (a.id === p.asset.id ? p.asset : a))),
    REMOVE_ASSET: (p) =>
        L.scenario.actors.byId.k(p.actorId).initialAssets.set((a) =>
            cascadeRemove(
                p.id,
                a,
                (a) => a.id,
                (a) => a.props.parentId,
            ),
        ),

    // Definition Manipulation : Steps
    ADD_STEP: (p) => L.scenario.steps.set((steps) => insertAt(steps, p.afterIndex + 1, p.step)),
    REMOVE_STEP: (p) => L.scenario.steps.set((steps) => steps.filter((a) => a.id !== p.id)),
    REORDER_STEPS: (p) => L.scenario.steps.set((steps) => reorder(steps, p.fromIndex, p.toIndex)),
    UPDATE_STEP: (p) => L.scenario.steps.set((steps) => steps.map((s) => (s.id === p.step.id ? p.step : s))),

    // Definition Manipulation : Meta
    UPDATE_META: (p) => L.scenario.meta.set(p.meta),

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
            const goto = Math.max(-1, Math.min(p.index, steps.length - 1));
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
