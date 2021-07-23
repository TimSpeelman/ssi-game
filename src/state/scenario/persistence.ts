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
        activeProject: selectPersistedProject(s.activeProject.present),
        inactiveProjects: s.inactiveProjects.map((p) => selectPersistedProject(p.present)),
    };
}

export function selectPersistedProject(project: ProjectState): PersistedProject {
    return {
        id: project.id,
        name: project.name,
        scenario: project.scenario,
    };
}

export function projectStateFromPersisted(state: PersistedProject): ProjectState {
    return {
        id: state.id,
        name: state.name,
        scenario: state.scenario,
        showMeta: false,
    };
}

export function rootStateFromPersisted(state: PersistedState): RootState {
    return {
        ...defaultState,
        activeProject: newHistory([], projectStateFromPersisted(state.activeProject), []),
        inactiveProjects: state.inactiveProjects.map((p) => newHistory([], projectStateFromPersisted(p), [])),
    };
}
