import { Translation } from '../../intl/Language';

export interface AssetFormConfig<Prop extends string> {
    title: Translation;
    fields: Partial<
        Record<
            Prop,
            {
                type: 'string' | 'actor';
                title: Translation;
            }
        >
    >;
    typeName: string;
}
