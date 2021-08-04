import { Vec } from '../../../util/vec';

export interface AssetEl {
    type: 'asset';
    id: string;
    c: Vec;
    r: number;
    active?: boolean;
    selected?: boolean;
    url: string;
    lit?: boolean;
    hovered?: boolean;
    numberOfChildren: number;
}
