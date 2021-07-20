import { Translation } from '../../../../intl/Language';

export interface ImageSelectField {
    type: 'image-select';
    title: Translation;
    options: Array<{ id: string; imageUrl: string; title?: Translation }>;
    value: string;
    disabled?: Translation;
}
