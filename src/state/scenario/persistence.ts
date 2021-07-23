import { defaultState } from './default';
import { ProjectState, RootState } from './state';

export type PersistedProject = Pick<ProjectState, 'name' | 'scenario'>;

export interface PersistedState {
    activeProject: PersistedProject;
    inactiveProjects: PersistedProject[];
}

export function selectPersistedState(s: RootState): PersistedState {
    return {
        activeProject: selectPersistedProject(s.activeProject),
        inactiveProjects: s.inactiveProjects.map(selectPersistedProject),
    };
}

export function selectPersistedProject(project: ProjectState): PersistedProject {
    return {
        name: project.name,
        scenario: project.scenario,
    };
}

export function projectStateFromPersisted(state: PersistedProject): ProjectState {
    return {
        name: state.name,
        scenario: state.scenario,
        showMeta: false,
    };
}

export function rootStateFromPersisted(state: PersistedState): RootState {
    return {
        ...defaultState,
        activeProject: projectStateFromPersisted(state.activeProject),
        inactiveProjects: state.inactiveProjects.map(projectStateFromPersisted),
    };
}
