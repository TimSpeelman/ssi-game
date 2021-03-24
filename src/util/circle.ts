import { zeroes } from './util';
import { fromPolar, round, Vec } from './vec';

/** Returns positions of the given number of points on a unit circle */
export function pointsOnCircle(numberOfPoints: number, offsetInRad = 0): Vec[] {
    if (numberOfPoints == 0) return [];
    if (numberOfPoints == 1) return [[1, 0]];
    const radPerPart = (2 * Math.PI) / numberOfPoints;
    return zeroes(numberOfPoints).map((_, i) => round(3)(fromPolar(offsetInRad + radPerPart * i)));
}
