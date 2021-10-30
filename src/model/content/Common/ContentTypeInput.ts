import { PropEvaluatedValue } from './Schema/PropEvaluatedValue';
import { RecordOfPropHandlers } from './Schema/RecordOfPropHandlers';

export type ContentTypeInput<T extends RecordOfPropHandlers> = {
    [K in keyof T]: PropEvaluatedValue<T[K]>;
};
