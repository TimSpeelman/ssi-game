import { ImgName } from '../../config/actorImage';

export interface Actor {
    id: string;
    image: ImgName;
    modeImages?: Record<string, ImgName>;
    name: string;
    description?: string;
    nounPhrase: string;
    isMale: boolean;
    isHuman: boolean;
}
