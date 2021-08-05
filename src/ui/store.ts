import { combineReducers, createStore } from 'redux';
import { saveToLocalStorage } from '../persistence/localStorage';
import { scenario } from '../state/scenario';
import { selectPersistedState } from '../state/scenario/persistence';
import { root } from '../state/scenario/selectors';
import { throttle } from '../util/util';

export const rootReducer = combineReducers({
    scenario: scenario,
});

export const store = createStore(
    rootReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// Sync saved state
store.subscribe(
    throttle(() => {
        const rootState = root(store.getState());
        const persistable = selectPersistedState(rootState);
        saveToLocalStorage('state', persistable);
    }, 1500),
);
