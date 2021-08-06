import { ImageOrIconDefinition } from '../../../../model/common/ImageOrIconDefinition';
import { Vec } from '../../../../util/vec';

export interface PseudonymEl {
    type: 'pseudonym';
    id: string;
    c: Vec;
    r: number;
    image?: ImageOrIconDefinition;
    selected?: boolean;
    hovered?: boolean;
}
