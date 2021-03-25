import each from 'jest-each';
import { findPointOnQuadraticBezierByDistance, quadraticBezier } from './curve';

describe('quadraticBezier', function () {
    each([
        // [x0,y0] [x1,y1] [x2,y2] t [xout, yout]
        [0, 0, 0, 5, 0, 10, 0, 0, 0],
        // vertical straight line, take start, quarter, middle and end
        [3, 4, 3, 6, 3, 8, 0.0, 3, 4],
        [3, 4, 3, 6, 3, 8, 0.25, 3, 5],
        [3, 4, 3, 6, 3, 8, 0.5, 3, 6],
        [3, 4, 3, 6, 3, 8, 1.0, 3, 8],
    ]).test('computes Q([%s,%s], [%s,%s], [%s,%s], %s) = [%s,%s]', (x0, y0, x1, y1, x2, y2, t, xout, yout) => {
        const q = quadraticBezier([x0, y0], [x1, y1], [x2, y2], t);
        expect(q).toEqual([xout, yout]);
    });
});

describe('findPointOnQuadraticBezierByDistance', function () {
    each([
        // [x0,y0] [x1,y1] [x2,y2] d tolerance tmin tmax
        [0, 0, 0, 5, 0, 10, 5, 0.01, 0.49, 0.51],
        [0, 0, 0, 5, 0, 10, 0, 0.01, 0, 0.01],
        // [0, 0, 0, 5, 0, 10, 5, 0.01, 0.5],
        // [0, 0, 0, 5, 0, 10, 5, 0.01, 0.5],
    ]).test(
        'computes Q([%s,%s], [%s,%s], [%s,%s], %s) in range [%s %s]',
        (x0, y0, x1, y1, x2, y2, d, tol, tmin, tmax) => {
            const q = findPointOnQuadraticBezierByDistance([x0, y0], [x1, y1], [x2, y2], d, tol);
            expect(q).toBeGreaterThanOrEqual(tmin);
            expect(q).toBeLessThanOrEqual(tmax);
        },
    );
});
