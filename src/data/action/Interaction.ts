import { Actor } from '../actor/Actor';

export interface Interaction {
    id: string;
    from: Actor;
    to: Actor;
    description: string;
    sub: string;
}
