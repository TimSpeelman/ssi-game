import { IAction } from './action/IAction';

export interface FormConfig<Prop extends string> {
    title: string;
    fields: Record<
        Prop,
        {
            type: 'string' | 'actor';
            title: string;
        }
    >;
    create: (id: string, data: Record<Prop, any>) => IAction;
}
