import { Translation } from '../../../../intl/Language';

export interface StringField {
    type: 'string';
    title: Translation;
    value: string;
    disabled?: Translation;
}
