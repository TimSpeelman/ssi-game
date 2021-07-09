import { DefTypeOfProp } from './Prop/IContentTypeProp';
import { ContentTypeProps } from './PropRecord/ContentTypeProps';

export type ParsedContentType<T extends ContentTypeProps> = {
    [K in keyof T]: DefTypeOfProp<T[K]>;
};
