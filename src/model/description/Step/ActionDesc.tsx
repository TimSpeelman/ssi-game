import { Translation } from '../../../intl/Language';
import { ActorDesc } from '../Actor/ActorDesc';

/**
 * An Action Description is used by the UI to display Actions. It is produced by the ActionTypes in
 * a ContentLibrary.
 */
export interface ActionDesc {
    id: string;

    /** The action's type */
    type: string;

    /** The source actor of the interaction */
    from: ActorDesc;

    /** The mode the source actor is in */
    from_mode?: string;

    /** The pseudonym the source actor is using (TODO: ContentLibrary concern) */
    from_nym?: string;

    /** The target actor of the interaction */
    to: ActorDesc;

    /** The mode the target actor is in */
    to_mode?: string;

    /** The pseudonym the target actor is using (TODO: ContentLibrary concern) */
    to_nym?: string;

    /** A title for the action */
    title: Translation;

    /** A subtitle for the action */
    sub: Translation;

    /** A long description for the action */
    long?: Translation;

    /** A user-defined additional explanation for the action */
    explanation?: string;

    /** The locality of the interaction (where actors are during the action) */
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
