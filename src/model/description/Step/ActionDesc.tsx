import { Translation } from '../../../intl/Language';
import { ActorDesc } from '../Actor/ActorDesc';

/** A generic description of an interaction, for view purposes */
export interface ActionDesc {
    type: string;
    id: string;
    from: ActorDesc;
    from_mode?: string;
    from_nym?: string;
    to: ActorDesc;
    to_mode?: string;
    to_nym?: string;
    description: Translation;
    long?: Translation;
    sub: Translation;
    locality: Locality;
    explanation?: string;
}

export enum Locality {
    /** Actors communicate remotely */
    REMOTE = 'REMOTE',
    /** Actors meet at the From Actor */
    AT_FROM = 'AT_FROM',
    /** Actors meet at the To Actor */
    AT_TO = 'AT_TO',
    /** Actors meet at the center */
    AT_CENTER = 'AT_CENTER',
}
