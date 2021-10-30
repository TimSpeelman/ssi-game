import { PropFieldType } from './PropFieldType';
import { RecordOfPropHandlers } from './RecordOfPropHandlers';

export type PropFieldTypes<T extends RecordOfPropHandlers> = {
    [K in keyof T]?: PropFieldType<T[K]>;
};
