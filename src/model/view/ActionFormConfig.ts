import { Translation } from '../../intl/Language';

export interface ActionFormConfig<Prop extends string> {
    title: Translation;
    fields: Record<
        Prop,
        {
            type: 'string' | 'actor';
            title: Translation;
        }
    >;
    typeName: string;
}
