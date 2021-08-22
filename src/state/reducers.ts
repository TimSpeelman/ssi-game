import { lens } from 'lens.ts';
import {
    persistableToProjectState as persistableToProjectWrapperState,
    persistableToRootState,
} from '../persistence/persistence';
import { ReducerMap } from '../util/redux';
import { w1th } from '../util/w1th';
import { GameActions } from './actions';
import { makeProjectState, makeProjectWrapperState } from './project/state';
import { GameState } from './state';

const L = lens<GameState>();

export const ScenarioReducers: ReducerMap<GameState, typeof GameActions> = {
    SET_GAME_STATE: (p) => L.set(p.state),

    RESTORE_PERSISTED_STATE: (p) => L.set(persistableToRootState(p.state)),
    LOAD_PROJECT: (p) => L.inactiveProjects.set((prs) => [persistableToProjectWrapperState(p.project), ...prs]),

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
    CREATE_PROJECT: (p) =>
        L.inactiveProjects.set((prs) => [
            makeProjectWrapperState(
                p.id,
                makeProjectState(p.definition ? { name: p.name, scenario: p.definition } : { name: p.name }),
            ),
            ...prs,
        ]),

    COPY_ACTIVE_PROJECT: (p) =>
        L.set((s) => ({
            ...s,
            inactiveProjects: [
                makeProjectWrapperState(p.id, makeProjectState({ ...s.activeProject.history.present, name: p.name })),
                ...s.inactiveProjects,
            ],
        })),

    SET_LANGUAGE: (p) => L.language.set(p.language),
    DELETE_PROJECT: (p) => L.inactiveProjects.set((prs) => prs.filter((pr) => pr.id !== p.id)),

    // Sidebar Navigation
    NAVIGATE_SIDEBAR: (p) => L.activeSidebarTab.set(p.to),

    SHOW_PROJECT_DRAWER: () => L.projectDrawerOpen.set(true),
    HIDE_PROJECT_DRAWER: () => L.projectDrawerOpen.set(false),

    // Options
    TOGGLE_SNACKBAR: (p) => L.snackbarOn.set((on) => !on),

    HIGHLIGHT_RESOURCE: (p) => L.highlightedResourceId!.set(p.resourceId),
    UNHIGHLIGHT_RESOURCE: (p) => L.highlightedResourceId!.set((r) => (r === p.resourceId ? '' : r)),

    // Display Meta Dialog
    HIDE_MANUAL: () => L.userManualOpen.set(false),
    SHOW_MANUAL: () => L.userManualOpen.set(true),

    TOGGLE_EDITING: ({ editing }) => L.editing.set((e) => (editing === true ? true : editing === false ? false : !e)),
};

// undoable(scenario, {
//     filter: (action) => !!action._undoable,
//     syncFilter: true,
// }),
