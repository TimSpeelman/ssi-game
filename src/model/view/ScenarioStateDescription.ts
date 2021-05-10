import { ActorState } from './ActorState';

/** A ScenarioState is a snapshot of all Actors and their Assets at a moment in time */
export interface ScenarioStateDescription {
    actors: Record<string, ActorState>;
    /** When a step fails, the scenario state is no longer valid */
    valid: boolean;
}
