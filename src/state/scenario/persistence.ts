import { newHistory } from 'redux-undo';
import { defaultState } from './default';
import { ProjectState, RootState } from './state';

export type PersistedProject = Pick<ProjectState, 'id' | 'name' | 'scenario'>;

export interface PersistedState {
    activeProject: PersistedProject;
    inactiveProjects: PersistedProject[];
}

export function selectPersistedState(s: RootState): PersistedState {
    return {
        activeProject: projectStateToPersistable(s.activeProject.present),
        inactiveProjects: s.inactiveProjects.map((p) => projectStateToPersistable(p.present)),
    };
}

export function projectStateToPersistable(project: ProjectState): PersistedProject {
    return {
        id: project.id,
        name: project.name,
        scenario: project.scenario,
    };
}

export function persistableToProjectState(state: PersistedProject): ProjectState {
    return {
        id: state.id,
        name: state.name,
        scenario: state.scenario,
        showMeta: false,
    };
}

export function persistableToRootState(state: PersistedState): RootState {
    return {
        ...defaultState,
        activeProject: newHistory([], persistableToProjectState(state.activeProject), []),
        inactiveProjects: state.inactiveProjects.map((p) => newHistory([], persistableToProjectState(p), [])),
    };
}
