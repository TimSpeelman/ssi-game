import { Translation } from '../../../intl/Language';
import { Actor } from '../../definition/Actor/Actor';

/** A generic description of an interaction, for view purposes */
export interface ActionDesc {
    type: string;
    id: string;
    from: Actor;
    from_mode?: string;
    to: Actor;
    to_mode?: string;
    description: Translation;
    long?: string;
    sub: string;
    locality: Locality;
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
