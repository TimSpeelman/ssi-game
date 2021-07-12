import { ActorProperties } from './ActorPropertySet';
import { ActorType } from './ActorType';

/** A player made actor definition */
export interface ActorDefinition {
    id: string;
    type: ActorType;
    name: string;
    nounPhrase: string;
    description?: string;
    properties: ActorProperties;
}
