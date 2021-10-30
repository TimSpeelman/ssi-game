import { IPropHandler } from './IPropHandler';

/** The type of the field produced by a property handler */
export type PropFieldType<T extends IPropHandler<any, any, any>> = T extends IPropHandler<any, any, infer U>
    ? U
    : never;
