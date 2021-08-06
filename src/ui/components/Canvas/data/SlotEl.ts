import { ImageOrIconDefinition } from '../../../../model/common/ImageOrIconDefinition';
import { Vec } from '../../../../util/vec';

export interface SlotEl {
    type: 'slot';
    id: string;
    c: Vec;
    r: number;
    selected?: boolean;
    hovered?: boolean;
    image: ImageOrIconDefinition;
    involvedInStep?: boolean;
    showImage: boolean;
}
