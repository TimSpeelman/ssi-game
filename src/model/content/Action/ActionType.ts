import { Action, BaseProps } from '../../logic/Step/Action';
import { DefTypesOfContentTypeProps } from '../Common/PropRecord/ContentTypeProps';
import { ActionSchema } from './ActionSchema';

export class ActionType<Props extends BaseProps> {
    constructor(
        readonly schema: ActionSchema<Props>,
        readonly factory: (id: string, props: DefTypesOfContentTypeProps<Props>) => Action<Props>,
    ) {}
}
