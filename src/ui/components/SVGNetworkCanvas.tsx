import React from 'react';
import { Vec } from '../../util/vec';

export type CanvasEvent = SlotEnterEvent | SlotLeaveEvent | ConnEnterEvent | ConnLeaveEvent | SlotDeleteEvent;

interface SlotEnterEvent {
    type: 'slot-enter';
    id: string;
}
interface SlotLeaveEvent {
    type: 'slot-leave';
    id: string;
}
interface ConnEnterEvent {
    type: 'conn-enter';
    id: string;
}
interface ConnLeaveEvent {
    type: 'conn-leave';
    id: string;
}
interface SlotDeleteEvent {
    type: 'slot-delete';
    id: string;
}

const middle = (a: number, b: number) => a + (b - a) / 2;

const curve = (x1: number, x2: number, qx: number, curve: number) => qx + (middle(x1, x2) - qx) * (1 - curve);

const slot = (e: Slot, dispatch: (e: CanvasEvent) => void) => (
    <g key={e.id}>
        {/* Background for hiding edges */}
        <circle cx={e.c[0]} cy={e.c[1]} r={e.r * 1.2} opacity={1} fill={'#eee'} />

        {/* Hover highlight */}
        <circle cx={e.c[0]} cy={e.c[1]} r={e.lit || e.active ? e.r * 1.1 : 0} opacity={1} fill={'#fef4bd'} />

        {/* Actor image */}
        <image href={e.url} x={e.c[0] - e.r} y={e.c[1] - e.r} width={e.r * 2} />

        {/* Capture events on a transparent circle slighty bigger */}
        <circle
            style={{ cursor: 'pointer' }}
            cx={e.c[0]}
            cy={e.c[1]}
            r={e.r * 1.1}
            fill={'transparent'}
            onMouseEnter={() => dispatch({ type: 'slot-enter', id: e.id })}
            onMouseLeave={() => dispatch({ type: 'slot-leave', id: e.id })}
        />

        {/* Delete */}

        <svg
            x={e.c[0] + (e.r * Math.sqrt(3)) / 2 - e.r * 0.4}
            y={e.c[1] - (e.r * Math.sqrt(3)) / 2 - e.r * 0.4}
            width={e.r * 0.8}
            height={e.r * 0.8}
        >
            <g
                style={{
                    transform: e.lit ? 'scale(1)' : 'scale(0)',
                    transitionDelay: '1s',
                    transformOrigin: '50% 50%',
                }}
            >
                <circle cx={e.r * 0.4} cy={e.r * 0.4} r={e.r * 0.4} fill={'#ccc'} />
                <text
                    x={e.r * 0.4}
                    y={e.r * 0.4}
                    fill="black"
                    className="fas"
                    textAnchor="middle"
                    dominantBaseline="middle"
                >
                    &#xf1f8;
                </text>
                <circle
                    cx={e.r * 0.4}
                    cy={e.r * 0.4}
                    r={e.r * 0.4 * 1.1}
                    fill={'transparent'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => dispatch({ type: 'slot-delete', id: e.id })}
                />
            </g>
        </svg>
    </g>
);

const cubicBezier = (a: Vec, q: Vec, b: Vec) => `M ${a[0]} ${a[1]} Q ${q[0]} ${q[1]} ${b[0]} ${b[1]}`;

const connection = (e: Connection, dispatch: (e: CanvasEvent) => void) => (
    <g key={e.id}>
        {/* Hover highlight */}
        <path
            d={cubicBezier(
                e.from,
                [curve(e.from[0], e.to[0], e.q[0], e.curve), curve(e.from[1], e.to[1], e.q[1], e.curve)],
                e.to,
            )}
            stroke={`#fef4bd`}
            strokeWidth={e.lit ? 25 : 0}
            fill="transparent"
        />

        {/* Path */}
        <path
            d={cubicBezier(
                e.from,
                [curve(e.from[0], e.to[0], e.q[0], e.curve), curve(e.from[1], e.to[1], e.q[1], e.curve)],
                e.to,
            )}
            stroke={`rgba(0,0,0,${e.active ? 1 : 0.1})`}
            strokeWidth={e.active ? 5 : 2}
            fill="transparent"
        />

        {/* Capture mouse events on a (wider) transparent path */}
        <path
            d={cubicBezier(
                e.from,
                [curve(e.from[0], e.to[0], e.q[0], e.curve), curve(e.from[1], e.to[1], e.q[1], e.curve)],
                e.to,
            )}
            style={{ cursor: 'pointer' }}
            stroke="transparent"
            strokeWidth={25}
            fill="transparent"
            onMouseEnter={() => dispatch({ type: 'conn-enter', id: e.id })}
            onMouseLeave={() => dispatch({ type: 'conn-leave', id: e.id })}
        />
    </g>
);
const interaction = (e: Interaction) => (
    <circle key={e.id} cx={e.c[0]} cy={e.c[1]} r={e.radius} fill={'hsl(0,0%,70%)'} opacity={0.7} />
);

export function SVGNetworkCanvas(props: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={1000} height={1000}>
            {props.elems.map((e) => {
                switch (e.type) {
                    case 'slot':
                        return slot(e, props.onEvent);
                    case 'connection':
                        return connection(e, props.onEvent);
                    case 'interaction':
                        return interaction(e);
                }
            })}
        </svg>
    );
}

export interface Props {
    elems: CanvasElem[];
    onEvent: (e: CanvasEvent) => void;
}

export type CanvasElem = Slot | Connection | Interaction;

export interface Slot {
    type: 'slot';
    id: string;
    c: Vec;
    r: number;
    active: boolean;
    url: string;
    lit: boolean;
}

export interface Connection {
    type: 'connection';
    id: string;
    from: Vec;
    to: Vec;
    q: Vec;
    active: boolean;
    curve: number;
    lit: boolean;
}

export interface Interaction {
    type: 'interaction';
    id: string;
    c: Vec;
    radius: number;
}
