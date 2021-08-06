import { ImageOrIconDefinition } from '../../description/ImageOrIconDefinition';

export interface Actor {
    id: string;
    img: ImageOrIconDefinition;
    modeImgs?: Record<string, ImageOrIconDefinition>;
    name: string;
    description?: string;
    nounPhrase: string;
    isMale: boolean;
    isHuman: boolean;
}
