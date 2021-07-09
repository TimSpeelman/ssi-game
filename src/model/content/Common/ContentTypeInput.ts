import { EvaluatedTypeOfProp } from './Prop/IContentTypeProp';
import { ContentTypeProps } from './PropRecord/ContentTypeProps';

export type ContentTypeInput<T extends ContentTypeProps> = {
    [K in keyof T]: EvaluatedTypeOfProp<T[K]>;
};
