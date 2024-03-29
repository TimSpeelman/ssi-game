import { Translation } from '../../intl/Language';
import { Field } from '../content/Common/Props/Field';

/** A view model for creating and manipulating actions */
export interface ActionFormData {
    typeName: string;
    title: Translation;
    description?: Translation;
    fields: Record<string, Field>;
    data: any;
}
