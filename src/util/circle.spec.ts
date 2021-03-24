import each from 'jest-each';
import { pointsOnCircle } from './circle';
import { round } from './util';

describe('pointsOnCircle', function () {
    const sqrt3over2 = round(Math.sqrt(2) / 2, 3);
    each([
        [0, []],
        [1, [[1, 0]]],
        [
            2,
            [
                [1, 0],
                [-1, 0],
            ],
        ],
        [
            4,
            [
                [1, 0],
                [0, 1],
                [-1, 0],
                [0, -1],
            ],
        ],
        [
            8,
            [
                [1, 0],
                [sqrt3over2, sqrt3over2],
                [0, 1],
                [-sqrt3over2, sqrt3over2],
                [-1, 0],
                [-sqrt3over2, -sqrt3over2],
                [0, -1],
                [sqrt3over2, -sqrt3over2],
            ],
        ],
    ]).test('returns %s points', (n, expected) => {
        const points = pointsOnCircle(n);
        expect(points).toEqual(expected);
    });
});
