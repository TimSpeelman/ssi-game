import { ImageOrIconDefinition } from '../../../../model/common/ImageOrIconDefinition';
import { Vec } from '../../../../util/vec';

export interface AssetEl {
    type: 'asset';
    id: string;
    c: Vec;
    r: number;
    active?: boolean;
    selected?: boolean;
    lit?: boolean;
    hovered?: boolean;
    numberOfChildren: number;
    image?: ImageOrIconDefinition;
    abbr?: string;
    transparent?: boolean;
}
