import { Action } from '../game/Action/Action';

export interface ActionFormConfig<Prop extends string> {
    title: string;
    fields: Record<
        Prop,
        {
            type: 'string' | 'actor';
            title: string;
        }
    >;
    create: (id: string, data: Record<Prop, any>) => Action;
}
