import { Vec } from '../../../util/vec';

export interface SlotEl {
    type: 'slot';
    id: string;
    c: Vec;
    r: number;
    selected?: boolean;
    hovered?: boolean;
    url: string;
    involvedInStep?: boolean;
    showImage: boolean;
}
