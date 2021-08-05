import { Translation } from '../../../../intl/Language';
import { ImageOrIconDefinition } from '../../../description/ImageOrIconDefinition';

export interface ImageSelectField {
    type: 'image-select';
    title: Translation;
    options: Array<{ id: string; image: ImageOrIconDefinition; title?: Translation }>;
    value: string;
    disabled?: Translation;
    helperText?: Translation;
}
