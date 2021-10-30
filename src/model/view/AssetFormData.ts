import { Translation } from '../../intl/Language';
import { Field } from '../content/Common/Props/Field';

/** A view model for creating and manipulating assets */
export interface AssetFormData {
    typeName: string;
    title: Translation;
    description?: Translation;
    fields: Record<string, Field>;
}
