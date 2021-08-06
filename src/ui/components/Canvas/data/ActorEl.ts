import { ImageOrIconDefinition } from '../../../../model/description/ImageOrIconDefinition';
import { Vec } from '../../../../util/vec';

export interface ActorEl {
    type: 'actor';
    id: string;
    c: Vec;
    r: number;
    selected?: boolean;
    hovered?: boolean;
    image?: ImageOrIconDefinition;
    involvedInStep?: boolean;
}
