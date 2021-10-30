import { PropEvaluatedValue } from './PropEvaluatedValue';
import { RecordOfPropHandlers } from './RecordOfPropHandlers';

export type PropEvaluatedValues<T extends RecordOfPropHandlers> = {
    [K in keyof T]?: PropEvaluatedValue<T[K]>;
};
