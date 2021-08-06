import { ImageOrIconDefinition } from '../../common/ImageOrIconDefinition';
import { ActorProperties } from '../../definition/Actor/ActorPropertySet';

export interface ActorDesc {
    id: string;
    image: ImageOrIconDefinition;
    modeImages?: Record<string, ImageOrIconDefinition>;
    name: string;
    description?: string;
    nounPhrase: string;
    isMale: boolean;
    isHuman: boolean;
    properties?: ActorProperties;
}
