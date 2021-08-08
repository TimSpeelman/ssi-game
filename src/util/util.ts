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

export function mapValues<T, S>(obj: Record<string, T>, map: (t: T, key: string) => S): Record<string, S> {
    return Object.entries(obj).reduce(
        (res, [key, val]) => ({
            ...res,
            [key]: map(val, key),
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

export function keyByFn<T extends Record<string, any>>(items: T[], keyBy: (t: T) => string): Record<string, T> {
    return items.reduce((rec, item) => ({ ...rec, [keyBy(item)]: item }), {});
}

export function keyBy<T extends Record<string, any>>(items: T[], key: keyof T): Record<string, T> {
    return items.reduce((rec, item) => ({ ...rec, [item[key]]: item }), {});
}

export function mergeRecords<T>(maps: Record<string, T>[]): Record<string, T> {
    return maps.reduce((all, map) => ({ ...all, ...map }), {});
}

export function groupBy<T extends Record<string, any>>(items: T[], by: (t: T) => string): Record<string, T[]> {
    return items.reduce((rec, item) => {
        const group = by(item);
        return { ...rec, [group]: [...(rec[group] || []), item] };
    }, {} as Record<string, T[]>);
}

export function cascadeRemove<T>(
    id: string,
    items: T[],
    getId: (t: T) => string,
    getParentId: (t: T) => string | undefined,
): T[] {
    const withoutId = items.filter((i) => getId(i) !== id);
    const deps = withoutId.filter((i) => getParentId(i) === id);
    const noDeps = deps.reduce(
        (withoutDeps, dep) => cascadeRemove(getId(dep), withoutDeps, getId, getParentId),
        withoutId,
    );
    return noDeps;
}

export function throttle(fn: () => void, ms: number) {
    let timeout: any = null;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(fn, ms);
    };
}

export function insertAt<T>(arr: T[], index: number, item: T): T[] {
    return [...arr.slice(0, index), item, ...arr.slice(index)];
}

export function format<T extends Record<string, string>>(template: (t: T) => string, data: T) {
    return template(data);
}

/** Replaces a string template like "hello {0}" with "hello world" if data ["world"] is passed. */
export function formatL(template: string, data: (string | number)[], failIfNoData = true, failIfDataUnused = true) {
    const matches = template.match(/\{([0-9]+)\}/g);

    // Collect all the keys used by the template
    const usedKeysRec: Record<string, boolean> = {};
    (matches || []).forEach((m) => {
        usedKeysRec[m.replace(/[\{\}]/g, '')] = true;
    });
    const usedKeys = Object.keys(usedKeysRec).map((x) => parseInt(x, 10));
    const missingDataKeys = usedKeys.filter((key) => key >= data.length);

    if (missingDataKeys.length > 0 && failIfNoData) {
        throw new Error(`Cannot format template '${template}', missing data keys ${missingDataKeys.join(', ')}`);
    }

    const unusedData = data.map((_, i) => i).filter((index) => !usedKeys.includes(index));
    if (unusedData.length > 0 && failIfDataUnused) {
        throw new Error(`Cannot format template '${template}', data keys unused: ${unusedData.join(', ')}`);
    }

    const formatted = data.reduce((str: string, d, i) => str.replace(new RegExp(`\\{${i}\\}`, 'g'), `${d}`), template);

    return formatted;
}
