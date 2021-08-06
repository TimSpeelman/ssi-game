import { combineReducers, createStore } from 'redux';
import { saveToLocalStorage } from '../persistence/localStorage';
import { scenario } from '../state';
import { selectPersistedState } from '../state/persistence';
import { root } from '../state/selectors';
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
