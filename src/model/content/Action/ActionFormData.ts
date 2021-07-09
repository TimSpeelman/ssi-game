import { Translation } from '../../../intl/Language';
import { Field } from '../Common/View/Field';

/** A view model for creating and manipulating actions */
export interface ActionFormData {
    typeName: string;
    title: Translation;
    fields: Record<string, Field>;
}
