import { Interaction } from '../action/Interaction';
import { Actor } from '../actor/Actor';
import { Asset } from '../asset/Asset';

export interface Scenario {
    actors: Record<
        string,
        {
            initialAssets: Asset[];
            actor: Actor;
        }
    >;
    activities: Interaction[];
}

export interface IntermediateScenarioState {
    actors: Record<
        string,
        {
            assets: Asset[];
            actor: Actor;
        }
    >;
    lastActivity: Interaction[];
}
