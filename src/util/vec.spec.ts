import each from 'jest-each';
import { angle } from './vec';

describe('angle', function () {
    const tolerance = 0.000001;
    each([
        [1, 0, 0],
        [10, 0, 0],
        [1, 1, Math.PI / 4],
        [0, 1, Math.PI / 2],
        [-1, 1, (Math.PI / 4) * 3],
        [-1, 0, Math.PI],
        [-1, -1, (Math.PI / 4) * 5],
        [0, -1, (Math.PI / 2) * 3],
        [1, -1, (Math.PI / 4) * 7],
    ]).test('angle of [%s, %s] = %s', (x, y, expected) => {
        const a = angle([x, y]);
        expect(a).toBeLessThanOrEqual(expected + tolerance);
        expect(a).toBeGreaterThanOrEqual(expected - tolerance);
    });
});
