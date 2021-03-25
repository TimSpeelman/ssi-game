import { vec, Vec } from './vec';

type Poly = Vec[];

/** Returns an Isosceles pointing right with the tip at [0,0] */
export const isosceles = (width: number, height: number): Poly => [
    vec(0, 0),
    vec(-height, width / 2),
    vec(-height, -width / 2),
];
