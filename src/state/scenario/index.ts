import { defaultState } from './default';
import { ScenarioReducer } from './reducers';

export const scenario = (s: any, a: any) => (s === undefined ? defaultState : ScenarioReducer(s, a));
