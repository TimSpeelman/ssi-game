import { combineReducers, createStore } from 'redux';
import undoable from 'redux-undo';
import { scenario } from '../state/scenario';

export const rootReducer = combineReducers({
    scenario: undoable(scenario, {
        filter: (action) => !!action._undoable,
        syncFilter: true,
    }),
});

export const store = createStore(
    rootReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
