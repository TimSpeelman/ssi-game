import { IPropHandler } from './IPropHandler';

/** The type of the evaluated value of a property handler */
export type PropEvaluatedValue<T extends IPropHandler<any, any, any>> = T extends IPropHandler<any, infer U, any>
    ? U
    : never;
