/**
 * Tiny utility library for Vector math
 */
import { round as rnd } from './util';

export type Vec = [number, number];
export type Map = (v: Vec) => Vec;
export type Reduce = (a: Vec, b: Vec) => Vec;

export const vec = (x: number, y: number): Vec => [x, y];

export const fromPolar = (rad: number, length = 1): Vec => [Math.cos(rad) * length, Math.sin(rad) * length];

export const map = (fn: (c: number) => number) => (p: Vec): Vec => [fn(p[0]), fn(p[1])];

export const reduce = (fn: (a: number, b: number) => number) => (a: Vec, b: Vec): Vec => [
    fn(a[0], b[0]),
    fn(a[1], b[1]),
];

export const add = reduce((a, b) => a + b);

export const sub = reduce((a, b) => a - b);

export const div = reduce((a, b) => a / b);

export const mul = reduce((a, b) => a * b);

export const avg = reduce((a, b) => a + (b - a) / 2);

export const eq = (a: Vec, b: Vec) => a[0] === b[0] && a[1] === b[1];

export const len = ([x, y]: Vec) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

export const dist = (from: Vec, to: Vec) => len(sub(to, from));

export const normalize = (v: Vec) => scale(1 / len(v))(v);

export const angle = (v: Vec): number => (v[0] < 0 ? Math.PI : v[1] < 0 ? 2 * Math.PI : 0) + Math.atan(v[1] / v[0]);

export const rotate = (rad: number) => (a: Vec): Vec => [
    a[0] * Math.cos(rad) - a[1] * Math.sin(rad),
    a[0] * Math.sin(rad) + a[1] * Math.cos(rad),
];

export const scale = (scale: number): Map => map((c) => c * scale);

export const round = (scale: number): Map => map((c) => rnd(c, scale));

export const fractionOfLine = (from: Vec, to: Vec, fraction: number) => add(from, scale(fraction)(sub(to, from)));
