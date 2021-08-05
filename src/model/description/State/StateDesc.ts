import { AssetTreeNode } from '../Asset/AssetTreeNode';
import { ActorStateDesc } from './ActorStateDesc';

/** A ScenarioState is a snapshot of all Actors and their Assets at a moment in time */
export interface StateDesc {
    actors: Record<string, ActorStateDesc>;
    /** Record of all assets by their id */
    assets: Record<string, AssetTreeNode>;
    /** Provide one mapping from id to resource */
    resources: Record<string, ResourceDesc>;
    /** When a step fails, the scenario state is no longer valid */
    valid: boolean;
}

export type ResourceDesc = { type: 'actor' } | { type: 'asset'; ownerId: string };
