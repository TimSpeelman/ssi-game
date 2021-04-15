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
