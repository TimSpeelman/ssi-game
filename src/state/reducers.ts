import { lens } from 'lens.ts';
import { newHistory } from 'redux-undo';
import { persistableToProjectState, persistableToRootState } from '../persistence/persistence';
import { ReducerMap } from '../util/redux';
import { w1th } from '../util/w1th';
import { GameActions } from './actions';
import { emptyProjectState } from './project/default';
import { RootState } from './state';

const L = lens<RootState>();

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
                {
                    ...emptyProjectState,
                    id: p.id,
                    name: p.name || '',
                    scenario: p.definition ? p.definition : emptyProjectState.scenario,
                },
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
