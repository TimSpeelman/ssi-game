import undoable from 'redux-undo';
import { getReducer, IAction } from '../util/redux';
import { ProjectReducers } from './project/reducers';
import { ProjectState } from './project/state';
import { ScenarioReducers } from './reducers';
import { GameState } from './state';

const getProjectReducer = getReducer(ProjectReducers);
const getGameReducer = getReducer(ScenarioReducers);

export function ActiveProjectReducer(s: ProjectState, e: IAction<any>): ProjectState {
    const r = getProjectReducer(e);
    return r ? r(e.payload)(s) : s;
}

export const undoableActiveProjectReducer = undoable(ActiveProjectReducer, {
    filter: (action) => !!action._undoable,
    syncFilter: true,
});

export function ScenarioReducer(s: GameState, e: IAction<any>): GameState {
    const r = getGameReducer(e);
    if (r) {
        return r(e.payload)(s);
    } else {
        return {
            ...s,
            activeProject: undoableActiveProjectReducer(s.activeProject, e),
        };
    }
}
