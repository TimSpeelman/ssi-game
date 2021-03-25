import { add, avg, dist, scale, sub, Vec } from './vec';

/** p1 + (1-t) ^2 * (p0-p1) + t^2 (p2-p1) */
export const quadraticBezier = (p0: Vec, p1: Vec, p2: Vec, t: number) =>
    add(add(p1, scale(Math.pow(1 - t, 2))(sub(p0, p1))), scale(Math.pow(t, 2))(sub(p2, p1)));

/** 2(1-t)(p1-p0) + 2t(p2-p1) */
export const quadraticBezierDerivative = (p0: Vec, p1: Vec, p2: Vec, t: number) =>
    add(scale(2 * (1 - t))(sub(p1, p0)), scale(2 * t)(sub(p2, p1)));

/** Scale the curve by computing a new Q (p1). 0 gives a straight line, 1 gives the original cuve, -1 the inverse curve */
export const scaleQuadraticBezierCurve = (p0: Vec, p1: Vec, p2: Vec, factor: number): Vec =>
    add(p1, scale(1 - factor)(sub(avg(p0, p2), p1)));

/** To position arrow heads at circles, find a point that lies on its radius */
export const findPointOnQuadraticBezierByDistance = (p0: Vec, p1: Vec, p2: Vec, d: number, tolerance: number): number =>
    binarySearch(0, 1, d, tolerance, (t) => dist(p0, quadraticBezier(p0, p1, p2, t)));

function binarySearch(t0: number, t1: number, target: number, tolerance: number, test: (t: number) => number) {
    let start = t0;
    let end = t1;
    let maxIterations = 10000;
    while (true) {
        const center = start + (end - start) / 2; // take middle
        if (maxIterations <= 0) {
            console.error('Binary search maxed out, returned best guess', center);
            return center;
        }
        maxIterations--;

        const d = test(center);
        const diff = target - d;
        if (Math.abs(diff) <= tolerance) {
            return center;
        } else {
            if (diff < 0) {
                end = center;
            } else {
                start = center;
            }
        }
    }
}
