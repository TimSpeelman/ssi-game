import { PropValue } from './Schema/PropValue';
import { RecordOfPropHandlers } from './Schema/RecordOfPropHandlers';

export type ParsedContentType<T extends RecordOfPropHandlers> = {
    [K in keyof T]: PropValue<T[K]>;
};
