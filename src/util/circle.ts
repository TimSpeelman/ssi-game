import { zeroes } from './util';
import { fromPolar, round, Vec } from './vec';

const TwoPi = Math.PI * 2;

/** Returns positions of the given number of points on a unit circle, equally spaced between a start and end angle */
export function pointsOnCircleEquidistant(numberOfPoints: number, startInRadians = 0, endInRadians = TwoPi): Vec[] {
    if (numberOfPoints == 0) return [];
    if (numberOfPoints == 1) return [fromPolar(startInRadians)];
    const radPerPart = endInRadians / numberOfPoints;
    return zeroes(numberOfPoints).map((_, i) => round(3)(fromPolar(startInRadians + radPerPart * i)));
}

/** Returns positions of the given number of points on a unit circle */
export function pointsOnCircleFixedRange(numberOfPoints: number, startInRad = 0, distInRad = 0): Vec[] {
    if (numberOfPoints == 0) return [];
    return zeroes(numberOfPoints).map((_, i) => round(3)(fromPolar(startInRad + distInRad * i)));
}

/** Returns positions of the given number of points on a unit circle */
export function pointsOnCircleFixedRangeCentered(numberOfPoints: number, centerInRad = 0, distInRad = 0): Vec[] {
    if (numberOfPoints == 0) return [];
    const range = distInRad * (numberOfPoints - 1);
    return pointsOnCircleFixedRange(numberOfPoints, centerInRad - range / 2, distInRad);
}
