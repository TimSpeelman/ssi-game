import { IPropHandler } from './IPropHandler';

/** The type of the value in a property handler */
export type PropValue<T extends IPropHandler<any, any, any>> = T extends IPropHandler<infer U, any, any> ? U : never;
