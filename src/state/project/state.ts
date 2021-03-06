import { newHistory, StateWithHistory } from 'redux-undo';
import { ScenarioDef } from '../../model/definition/Scenario/ScenarioDef';
import { orderedMap } from '../../util/types/OrderedMap';

export interface ProjectStateWithHistory {
    id: string;
    history: StateWithHistory<ProjectState>;
}

export interface ProjectState {
    name: string;
    scenario: ScenarioDef;
    showMeta: boolean;

    selectedActorId?: string;
    selectedAssetId?: string;
    activeStepId?: string;
}

export const makeProjectWrapperState = (id: string, project: ProjectState): ProjectStateWithHistory => ({
    id: id,
    history: newHistory([], project, []),
});

export const makeProjectState = (s: Partial<ProjectState>): ProjectState => ({
    name: '',
    scenario: makeScenarioDef({}),
    showMeta: false,
    ...s,
});

export const makeScenarioDef = (def: Partial<ScenarioDef>): ScenarioDef => ({
    actors: orderedMap.empty,
    meta: {
        title: '',
        author: '',
        body: '',
    },
    steps: [],
});
