import { Actor } from './Actor';

export interface IInteraction {
    id: string;
    from: Actor;
    to: Actor;
    description: string;
    sub: string;
}
