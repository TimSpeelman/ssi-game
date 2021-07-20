import { Translation } from '../../../../intl/Language';

export interface ImageSelectField {
    type: 'image-select';
    title: Translation;
    options: Array<{ id: string; imageUrl: string }>;
    value: string;
    disabled?: Translation;
}
