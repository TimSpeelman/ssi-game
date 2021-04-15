import each from 'jest-each';
import { angle, fromPolar } from './vec';

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

describe('polar', function () {
    const tolerance = 0.000001;
    each([
        [0, 1, 1, 0],
        [Math.PI / 2, 1, 0, 1],
    ]).test('polar %s deg * %s length = [%s, %s]', (deg, len, x, y) => {
        const [ax, ay] = fromPolar(deg, len);
        expect(ax).toBeLessThanOrEqual(x + tolerance);
        expect(ay).toBeLessThanOrEqual(y + tolerance);
        expect(ax).toBeGreaterThanOrEqual(x - tolerance);
        expect(ay).toBeGreaterThanOrEqual(y - tolerance);
    });
});
