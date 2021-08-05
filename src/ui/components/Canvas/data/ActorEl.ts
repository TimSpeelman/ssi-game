import { Vec } from '../../../../util/vec';

export interface ActorEl {
    type: 'actor';
    id: string;
    c: Vec;
    r: number;
    selected?: boolean;
    hovered?: boolean;
    url: string;
    involvedInStep?: boolean;
}
