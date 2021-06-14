import each from 'jest-each';
import { cascadeRemove, reorder } from './util';

describe('angle', function () {
    const list = [1, 2, 3, 4, 5];
    each([
        [1, 1, list],
        [0, 1, [2, 1, 3, 4, 5]],
        [0, 2, [2, 3, 1, 4, 5]],
        [0, 3, [2, 3, 4, 1, 5]],
        [0, 4, [2, 3, 4, 5, 1]],
        [3, 0, [4, 1, 2, 3, 5]],
        [3, 1, [1, 4, 2, 3, 5]],
        [3, 2, [1, 2, 4, 3, 5]],
    ]).test('moving %s to %s', (fromI, toI, expected) => {
        const result = reorder(list, fromI, toI);
        expect(result).toEqual(expected);
    });
});

describe('cascadeRemove', function () {
    test('removes deps', function () {
        const items = [
            { id: '1', parentId: undefined },
            { id: '2', parentId: undefined },
            { id: '3', parentId: '2' },
            { id: '4', parentId: '3' },
            { id: '5', parentId: '1' },
        ];
        const removed = cascadeRemove(
            '2',
            items,
            (t) => t.id,
            (t) => t.parentId,
        );
        expect(removed).toEqual([items[0], items[4]]);
    });
});
