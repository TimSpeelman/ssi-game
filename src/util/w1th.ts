/** Convenience function to re-use a value multiple times */
export function w1th<V, R>(value: V, fn: (val: V) => R): R {
    return fn(value);
}
