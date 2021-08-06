import { Translation } from '../../../../intl/Language';
import { ActorDesc } from '../../../description/Actor/ActorDesc';

export interface ActorField {
    type: 'actor';
    title: Translation;
    options: ActorDesc[];
    value: string;
    disabled?: Translation;
    helperText?: Translation;
}
