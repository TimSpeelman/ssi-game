import { ActorState } from './ActorState';

/** A ScenarioState is a snapshot of all Actors and their Assets at a moment in time */
export interface ScenarioStateDescription {
    actors: Record<string, ActorState>;
}
