import { defaultState } from '../state/default';
import { makeProjectWrapperState, ProjectState, ProjectStateWithHistory } from '../state/project/state';
import { GameState } from '../state/state';

export type PersistedProject = { id: string } & Pick<ProjectState, 'name' | 'scenario'>;

export interface PersistedState {
    activeProject: PersistedProject;
    inactiveProjects: PersistedProject[];
}

export function selectPersistedState(s: GameState): PersistedState {
    return {
        activeProject: projectStateToPersistable(s.activeProject.id, s.activeProject.history.present),
        inactiveProjects: s.inactiveProjects.map((p) => projectStateToPersistable(p.id, p.history.present)),
    };
}

export function projectStateToPersistable(id: string, project: ProjectState): PersistedProject {
    return {
        id: id,
        name: project.name,
        scenario: project.scenario,
    };
}

export function persistableToProjectState(state: PersistedProject): ProjectStateWithHistory {
    return makeProjectWrapperState(state.id, {
        name: state.name,
        scenario: state.scenario,
        showMeta: false,
    });
}

export function persistableToRootState(state: PersistedState): GameState {
    return {
        ...defaultState,
        activeProject: persistableToProjectState(state.activeProject),
        inactiveProjects: state.inactiveProjects.map((p) => persistableToProjectState(p)),
    };
}
