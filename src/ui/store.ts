import { combineReducers, createStore } from 'redux';
import { scenario } from '../state/scenario';

export const rootReducer = combineReducers({ scenario });

export const store = createStore(
    rootReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
