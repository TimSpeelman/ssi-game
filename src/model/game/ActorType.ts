import { ImgName } from '../../config/actorImage';

/** The game predefines some actor types a player can choose from */
export interface ActorType {
    id: string;
    image: ImgName;
    modeImages?: Record<string, ImgName>;
    typeName: string;
    isHuman: boolean;
    isMale: boolean;
}
