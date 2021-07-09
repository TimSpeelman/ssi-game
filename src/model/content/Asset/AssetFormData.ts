import { Translation } from '../../../intl/Language';
import { Field } from '../Common/View/Field';

/** A view model for creating and manipulating assets */
export interface AssetFormData {
    typeName: string;
    title: Translation;
    fields: Record<string, Field>;
}
