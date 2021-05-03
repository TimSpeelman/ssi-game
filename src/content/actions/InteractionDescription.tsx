import { Actor } from '../../model/game/Actor';

/** A generic description of an interaction, for view purposes */
export interface InteractionDescription {
    type: string;
    id: string;
    from: Actor;
    from_mode?: string;
    to: Actor;
    to_mode?: string;
    description: string;
    long?: string;
    sub: string;
}
