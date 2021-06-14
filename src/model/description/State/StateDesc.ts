import { AssetTreeNode } from '../Asset/AssetTreeNode';
import { ActorStateDesc } from './ActorStateDesc';

/** A ScenarioState is a snapshot of all Actors and their Assets at a moment in time */
export interface StateDesc {
    actors: Record<string, ActorStateDesc>;
    assets: Record<string, AssetTreeNode>;
    /** When a step fails, the scenario state is no longer valid */
    valid: boolean;
}
