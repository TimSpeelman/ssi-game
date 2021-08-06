import { ImageOrIconDefinition } from '../../description/ImageOrIconDefinition';

/** The game predefines some actor types a player can choose from */
export interface ActorType {
    id: string;
    image: ImageOrIconDefinition;
    modeImages?: Record<string, ImageOrIconDefinition>;
    typeName: string;
    isHuman: boolean;
    isMale: boolean;
}
