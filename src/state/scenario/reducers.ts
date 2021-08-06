import { lens } from 'lens.ts';
import { newHistory } from 'redux-undo';
import { ReducerMap } from '../../util/redux';
import { cascadeRemove, reorder } from '../../util/util';
import { w1th } from '../../util/w1th';
import { GameActions, ProjectActions } from './actions';
import { emptyProjectState } from './default';
import { persistableToProjectState, persistableToRootState } from './persistence';
import { ProjectState, RootState } from './state';

const L = lens<RootState>();
const LPr = lens<ProjectState>();

export const ProjectReducers: ReducerMap<ProjectState, typeof ProjectActions> = {
    RENAME_PROJECT: (p) => LPr.name.set(p.name),

    // Definition
    SET_SCENARIO: (p) => LPr.scenario.set(p.scenario),
    SET_ACTORS: (p) => LPr.scenario.actors.set(p.actors),

    // Definition Manipulation : Actors
    ADD_ACTOR: (p) => LPr.scenario.actors.set((actors) => [...actors, p.actor]),
    REMOVE_ACTOR: (p) => LPr.scenario.actors.set((actors) => actors.filter((a) => a.definition.id !== p.id)),
    REORDER_ACTORS: (p) => LPr.scenario.actors.set((actors) => reorder(actors, p.sourceIndex, p.targetIndex)),
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
    REORDER_STEPS: (p) => LPr.scenario.steps.set((steps) => reorder(steps, p.sourceIndex, p.targetIndex)),
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

    // Display Meta Dialog
    HIDE_META: () => LPr.showMeta.set(false),
    SHOW_META: () => LPr.showMeta.set(true),
};

export const ScenarioReducers: ReducerMap<RootState, typeof GameActions> = {
    RESTORE_STATE: (p) => L.set(persistableToRootState(p.state)),
    LOAD_PROJECT: (p) =>
        L.inactiveProjects.set((prs) => [newHistory([], persistableToProjectState(p.project), []), ...prs]),

    ACTIVATE_PROJECT: (p) =>
        L.set((s) =>
            w1th(
                s.inactiveProjects.find((pr) => p.id === pr.present.id),
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
    NEW_PROJECT: (p) =>
        L.inactiveProjects.set((prs) => [
            newHistory(
                [],
                { ...emptyProjectState, id: p.id, scenario: p.definition ? p.definition : emptyProjectState.scenario },
                [],
            ),
            ...prs,
        ]),
    COPY_ACTIVE_PROJECT: (p) =>
        L.set((s) => ({
            ...s,
            inactiveProjects: [
                newHistory([], { ...s.activeProject.present, id: p.id, name: p.name }, []),
                ...s.inactiveProjects,
            ],
        })),
    SET_LANGUAGE: (p) => L.language.set(p.language),
    DELETE_PROJECT: (p) => L.inactiveProjects.set((prs) => prs.filter((pr) => pr.present.id !== p.id)),

    // Sidebar Navigation
    NAVIGATE_SIDEBAR: (p) => L.activeSidebarTab.set(p.to),
    NAVIGATE_TO_RESOURCE: (p) => (s: any) => s, // TODO FIXME

    OPEN_PROJECT_DRAWER: () => L.projectDrawerOpen.set(true),
    CLOSE_PROJECT_DRAWER: () => L.projectDrawerOpen.set(false),

    // Options
    TOGGLE_SNACKBAR: (p) => L.snackbarOn.set((on) => !on),

    HIGHLIGHT_RESOURCE: (p) => L.highlightedResourceId!.set(p.resourceId),
    UNHIGHLIGHT_RESOURCE: (p) => L.highlightedResourceId!.set((r) => (r === p.resourceId ? '' : r)),

    // Display Meta Dialog
    HIDE_MANUAL: () => L.userManualOpen.set(false),
    SHOW_MANUAL: () => L.userManualOpen.set(true),
};

// undoable(scenario, {
//     filter: (action) => !!action._undoable,
//     syncFilter: true,
// }),
