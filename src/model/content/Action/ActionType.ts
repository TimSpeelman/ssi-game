import { Action, BaseProps } from '../../logic/Step/Action';
import { PropValues } from '../Common/Schema/PropValues';
import { ActionSchema } from './ActionSchema';

export class ActionType<Props extends BaseProps> {
    constructor(
        readonly schema: ActionSchema<Props>,
        readonly factory: (id: string, props: PropValues<Props>) => Action<Props>,
    ) {}
}
