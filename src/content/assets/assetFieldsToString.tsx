import { Asset } from './Asset';

export function assetFieldsToString(a: Asset) {
    const keys = Object.keys(a);
    return (
        keys
            .filter((k) => k !== 'kind' && k !== 'type')
            // @ts-ignore
            .map((k) => `${k}:${a[k]}`)
            .join(' | ')
    );
}
