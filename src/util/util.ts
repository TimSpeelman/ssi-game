export function zeroes(n: number) {
    return new Array(n).fill(0);
}

export function round(n: number, scale: number) {
    const d = Math.pow(10, scale);
    return unsignZero(Math.round(n * d) / d);
}

export function unsignZero(n: number) {
    return n === -0 ? 0 : n;
}

export function omit<K extends string | number>(key: K | K[]) {
    const keys = key instanceof Array ? key : [key];
    return function <O extends Record<K, any>>(o: O) {
        const res = { ...o };
        keys.forEach((key) => {
            delete res[key];
        });
        return res;
    };
}

export function ucFirst(str: string) {
    return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}

export function mapValues<T, S>(obj: Record<string, T>, map: (t: T) => S): Record<string, S> {
    return Object.entries(obj).reduce(
        (res, [key, val]) => ({
            ...res,
            [key]: map(val),
        }),
        {},
    );
}

export function reorder<T>(list: T[], fromIndex: number, toIndex: number) {
    if (list.length === 0) return [];
    if (toIndex === fromIndex) return list;
    const item = list[fromIndex];
    const list1 = list.filter((x, i) => i !== fromIndex);
    const index = toIndex;
    const list2 = [...list1.slice(0, index), item, ...list1.slice(index)];
    return list2;
}

export function seq<S>(ops: Array<(s: S) => S>): (s: S) => S {
    return (s0: S) => ops.reduce((s1, op) => op(s1), s0);
}

/** Wraps an event handler and runs preventDefault */
export function preventDefault<E extends { preventDefault: () => void }>(handle: (e: E) => void): (e: E) => void {
    return (e: E) => {
        e.preventDefault();
        handle(e);
    };
}

/** Wraps an event handler and runs stopPropagation */
export function stopPropagation<E extends { stopPropagation: () => void }>(handle: (e: E) => void): (e: E) => void {
    return (e: E) => {
        e.stopPropagation();
        handle(e);
    };
}
