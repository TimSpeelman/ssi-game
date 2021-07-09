import { Action } from '../../logic/Step/Action';
import { ContentTypeProps, DefTypesOfContentTypeProps } from '../Common/PropRecord/ContentTypeProps';
import { ActionSchema } from './ActionSchema';

export class ActionType<Props extends ContentTypeProps> {
    constructor(
        readonly schema: ActionSchema<Props>,
        readonly factory: (id: string, props: DefTypesOfContentTypeProps<Props>) => Action<Props>,
    ) {}
}
