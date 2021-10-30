import { Translation } from '../../../../intl/Language';
import { ImageOrIconDefinition } from '../../../common/ImageOrIconDefinition';

export interface ImageSelectField {
    type: 'image-select';
    title: Translation;
    options: Array<{ id: string; image: ImageOrIconDefinition; title?: Translation }>;
    value: string;
    disabled?: Translation;
    helperText?: Translation;
    error?: string;
}
