import { Actor } from '../actor/Actor';

/** A generic description of an interaction, for view purposes */
export interface InteractionDescription {
    type: string;
    id: string;
    from: Actor;
    to: Actor;
    description: string;
    sub: string;
}
