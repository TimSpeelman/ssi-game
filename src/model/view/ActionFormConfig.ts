export interface ActionFormConfig<Prop extends string> {
    title: string;
    fields: Record<
        Prop,
        {
            type: 'string' | 'actor';
            title: string;
        }
    >;
}
