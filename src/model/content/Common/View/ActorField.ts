import { Translation } from '../../../../intl/Language';
import { Actor } from '../../../definition/Actor/Actor';

export interface ActorField {
    type: 'actor';
    title: Translation;
    options: Actor[];
    value: string;
}
