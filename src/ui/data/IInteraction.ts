import { Actor } from './Actor';

export interface IInteraction {
    from: Actor;
    to: Actor;
    description: string;
    sub: string;
}
