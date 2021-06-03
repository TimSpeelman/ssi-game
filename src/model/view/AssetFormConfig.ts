export interface AssetFormConfig<Prop extends string> {
    title: string;
    fields: Record<
        Prop,
        {
            type: 'string' | 'actor';
            title: string;
        }
    >;
    typeName: string;
}
