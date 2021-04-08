import { Actor } from '../Actor';
import { IInteraction } from '../IInteraction';

export interface Scenario {
    actors: Actor[];
    activities: IInteraction[];
}
