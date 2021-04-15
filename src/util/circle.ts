import { zeroes } from './util';
import { fromPolar, round, Vec } from './vec';

const TwoPi = Math.PI * 2;

/** Returns positions of the given number of points on a unit circle */
export function pointsOnCircleEquidistant(numberOfPoints: number, offsetInRad = 0, range = TwoPi): Vec[] {
    if (numberOfPoints == 0) return [];
    if (numberOfPoints == 1) return [fromPolar(offsetInRad)];
    const radPerPart = range / numberOfPoints;
    return zeroes(numberOfPoints).map((_, i) => round(3)(fromPolar(offsetInRad + radPerPart * i)));
}

/** Returns positions of the given number of points on a unit circle */
export function pointsOnCircleFixedRange(numberOfPoints: number, startAtRad = 0, distInRad = 0): Vec[] {
    if (numberOfPoints == 0) return [];
    return zeroes(numberOfPoints).map((_, i) => round(3)(fromPolar(startAtRad + distInRad * i)));
}

/** Returns positions of the given number of points on a unit circle */
export function pointsOnCircleFixedRangeCentered(numberOfPoints: number, centerAtRad = 0, distInRad = 0): Vec[] {
    if (numberOfPoints == 0) return [];
    const range = distInRad * numberOfPoints;
    return pointsOnCircleFixedRange(numberOfPoints, centerAtRad - range / 2, distInRad);
}
