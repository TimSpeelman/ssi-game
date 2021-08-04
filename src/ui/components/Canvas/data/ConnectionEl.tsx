import { Vec } from '../../../../util/vec';

export interface ConnectionEl {
    type: 'connection';
    id: string;
    from: Vec;
    to: Vec;
    q: Vec;
    involvedInStep?: boolean;
    lit?: boolean;
    hovered?: boolean;
}
