import { Vec } from '../../../../util/vec';

export interface PseudonymEl {
    type: 'pseudonym';
    id: string;
    c: Vec;
    r: number;
    url: string;
    selected?: boolean;
    hovered?: boolean;
}
