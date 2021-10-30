import { PropValue } from './PropValue';
import { RecordOfPropHandlers } from './RecordOfPropHandlers';

export type PropValues<T extends RecordOfPropHandlers> = {
    [K in keyof T]: PropValue<T[K]>;
};
