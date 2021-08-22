export type Extend<A, B> = Omit<A, keyof B> & B;
