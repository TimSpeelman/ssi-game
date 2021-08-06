import { ActorProperties } from '../../definition/Actor/ActorPropertySet';
import { ImageOrIconDefinition } from '../ImageOrIconDefinition';

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
