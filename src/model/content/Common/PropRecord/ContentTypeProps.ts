import { DefTypeOfProp, EvaluatedTypeOfProp, IContentTypeProp } from '../Prop/IContentTypeProp';
import { Field } from '../View/Field';

export type ContentTypeProps = Record<string, IContentTypeProp<any, any>>;

export type FormPropsOfContentTypeProps<T extends ContentTypeProps> = {
    [K in keyof T]: Field;
};

export type DefTypesOfContentTypeProps<T extends ContentTypeProps> = {
    [K in keyof T]: DefTypeOfProp<T[K]>;
};

export type EvaluatedTypeOfContentProps<T extends ContentTypeProps> = {
    [K in keyof T]?: EvaluatedTypeOfProp<T[K]>;
};
