import { ImageOrIconDefinition } from '../../common/ImageOrIconDefinition';
import { ActorProperties } from '../../definition/Actor/ActorPropertySet';

/**
 * An Actor Description is used by the UI to display Actors.
 */
export interface ActorDesc {
    id: string;

    /** An image or icon representing the actor */
    image: ImageOrIconDefinition;

    /** Depending on the mode the actor is in, a different image or icon may be shown */
    modeImages?: Record<string, ImageOrIconDefinition>;

    /** A name for the actor */
    name: string;

    /** The noun phrase, for using in a sentence */
    nounPhrase: string;

    /** A longer description for the actor */
    description?: string;

    /** Used for addressing as he or she */
    isMale: boolean;

    /** Used for addressing as he or she, or it */
    isHuman: boolean;

    /** Optional. Any custom properties that describe the actor */
    properties?: ActorProperties;
}
