import { lens } from 'lens.ts';
import { IAction, ReducerMap } from '../../util/redux';
import { cascadeRemove, reorder } from '../../util/util';
import { w1th } from '../../util/w1th';
import { ScenarioActions } from './actions';
import { defaultScenario, emptyProjectState, emptyScenario } from './default';
import { rootStateFromPersisted } from './persistence';
import { RootState } from './state';

const L = lens<RootState>();
const LPr = lens<RootState>().activeProject;

const ScenarioReducers: ReducerMap<RootState, typeof ScenarioActions> = {
    RESTORE_STATE: (p) => L.set(rootStateFromPersisted(p.state)),

    ACTIVATE_PROJECT: (p) =>
        L.set((s) =>
            w1th(
                s.inactiveProjects.find((pr) => p.id === pr.id),
                (projectToActivate) =>
                    !projectToActivate
                        ? s
                        : {
                              ...s,
                              inactiveProjects: [
                                  s.activeProject,
                                  ...s.inactiveProjects.filter((pr) => pr !== projectToActivate),
                              ],
                              activeProject: projectToActivate,
                          },
            ),
        ),
    NEW_PROJECT: (p) => L.inactiveProjects.set((prs) => [{ ...emptyProjectState, id: p.id }, ...prs]),
    RENAME_PROJECT: (p) => L.activeProject.name.set(p.name),
    SET_LANGUAGE: (p) => L.language.set(p.language),

    // Definition
    CLEAR: (p) => LPr.scenario.set(emptyScenario),
    RESET: (p) => LPr.scenario.set(defaultScenario),
    SET_SCENARIO: (p) => LPr.scenario.set(p.scenario),
    SET_ACTORS: (p) => LPr.scenario.actors.set(p.actors),

    // Definition Manipulation : Actors
    ADD_ACTOR: (p) => LPr.scenario.actors.set((actors) => [...actors, p.actor]),
    REMOVE_ACTOR: (p) => LPr.scenario.actors.set((actors) => actors.filter((a) => a.definition.id !== p.id)),
    UPDATE_ACTOR_DEFINITION: (p) =>
        LPr.scenario.actors.set((actors) =>
            actors.map((a) => (a.definition.id === p.def.id ? { ...a, definition: p.def } : a)),
        ),

    // Definition Manipulation : Asset
    ADD_ASSET: (p) =>
        LPr.scenario.actors.set((actors) =>
            actors.map((a) =>
                a.definition.id === p.actorId ? { ...a, initialAssets: [...a.initialAssets, p.asset] } : a,
            ),
        ),
    UPDATE_ASSET: (p) =>
        LPr.scenario.actors.set((actors) =>
            actors.map((a) =>
                a.definition.id === p.actorId
                    ? { ...a, initialAssets: a.initialAssets.map((a) => (a.id === p.asset.id ? p.asset : a)) }
                    : a,
            ),
        ),
    REMOVE_ASSET: (p) =>
        LPr.scenario.actors.set((actors) =>
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
    ADD_STEP: (p) => LPr.scenario.steps.set((steps) => [...steps, p.step]),
    REMOVE_STEP: (p) => LPr.scenario.steps.set((steps) => steps.filter((a) => a.id !== p.id)),
    REORDER_STEP: (p) => LPr.scenario.steps.set((steps) => reorder(steps, p.sourceIndex, p.targetIndex)),
    UPDATE_STEP: (p) => LPr.scenario.steps.set((steps) => steps.map((s) => (s.id === p.step.id ? p.step : s))),

    // Definition Manipulation : Meta
    CHANGE_META: (p) => LPr.scenario.meta.set(p.meta),

    // Selection
    CLEAR_SELECTION: (p) =>
        LPr.set((s) => ({
            ...s,
            selectedStepId: undefined,
            selectedActorId: undefined,
            selectedAssetId: undefined,
        })),
    SELECT_ACTOR: (p) =>
        LPr.set((s) => ({
            ...s,
            selectedStepId: undefined,
            selectedActorId: p.id,
            selectedAssetId: undefined,
        })),
    SELECT_ASSET: (p) =>
        LPr.set((s) => ({
            ...s,
            selectedStepId: undefined,
            selectedActorId: undefined,
            selectedAssetId: p.id,
        })),
    SELECT_STEP: (p) =>
        LPr.set((s) => ({
            ...s,
            selectedStepId: p.id,
            selectedActorId: undefined,
            selectedAssetId: undefined,
        })),

    // Sequence Navigation
    GOTO_STEP: (p) => LPr.activeStepId!.set(p.id),
    GOTO_STEP_INDEX: (p) =>
        LPr.set((s) => {
            const steps = s.scenario.steps;
            const goto = Math.max(-1, Math.min(p.index - 1, steps.length - 1));
            return { ...s, activeStepId: goto === -1 ? undefined : steps[goto].id };
        }),
    NEXT_STEP: (p) =>
        LPr.set((s) => {
            const activeIndex = s.activeStepId ? s.scenario.steps.findIndex((step) => step.id === s.activeStepId) : -1;
            const numberOfSteps = s.scenario.steps.length;
            const nextIndex = activeIndex >= numberOfSteps - 1 ? -1 : activeIndex + 1;
            const nextId = nextIndex < 0 ? undefined : s.scenario.steps[nextIndex].id;
            return { ...s, activeStepId: nextId };
        }),
    PREV_STEP: (p) =>
        LPr.set((s) => {
            const firstId = s.scenario.steps[0];
            const activeIndex = s.activeStepId ? s.scenario.steps.findIndex((step) => step.id === s.activeStepId) : -1;
            const numberOfSteps = s.scenario.steps.length;
            const nextIndex = activeIndex === -1 ? numberOfSteps - 1 : activeIndex - 1;
            const nextId = nextIndex < 0 ? undefined : s.scenario.steps[nextIndex].id;
            return { ...s, activeStepId: nextId };
        }),
    FIRST_STEP: (p) => LPr.activeStepId!.set(undefined),
    LAST_STEP: (p) =>
        LPr.set((s) => {
            const steps = s.scenario.steps;
            const lastStep = steps.length === 0 ? undefined : steps[steps.length - 1].id;
            return { ...s, activeStepId: lastStep };
        }),

    // Sidebar Navigation
    NAVIGATE_SIDEBAR: (p) => L.activeSidebarTab.set(p.to),
    NAVIGATE_TO_RESOURCE: (p) => (s: any) => s, // TODO FIXME
    HIGHLIGHT_RESOURCE: (p) => L.highlightedResourceId!.set(p.resourceId),
    UNHIGHLIGHT_RESOURCE: (p) => L.highlightedResourceId!.set((r) => (r === p.resourceId ? '' : r)),

    // Display Meta Dialog
    HIDE_META: () => LPr.showMeta.set(false),
    SHOW_META: () => LPr.showMeta.set(true),

    // Options
    TOGGLE_SNACKBAR: (p) => L.snackbarOn.set((on) => !on),
};

export function ScenarioReducer(s: RootState, e: IAction<any>) {
    const r = e.type in ScenarioReducers ? ScenarioReducers[e.type as keyof typeof ScenarioReducers] : undefined;
    return r ? r(e.payload)(s) : s;
}
