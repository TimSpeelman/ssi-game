import React from 'react';
import { Vec } from '../../util/vec';

export type CanvasEvent =
    | SlotClickEvent
    | SlotEnterEvent
    | SlotLeaveEvent
    | ConnEnterEvent
    | ConnLeaveEvent
    | SlotDeleteEvent;

interface SlotEnterEvent {
    type: 'slot-enter';
    id: string;
}
interface SlotClickEvent {
    type: 'slot-click';
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

const slot = (e: SlotEl, dispatch: (e: CanvasEvent) => void) => (
    <g key={e.id}>
        {/* Background for hiding edges */}
        <circle cx={e.c[0]} cy={e.c[1]} r={e.r * 1.2} opacity={1} fill={'#eee'} />

        {/* Selection or hover */}
        <circle cx={e.c[0]} cy={e.c[1]} r={e.selected || e.hovered ? e.r * 1.1 : 0} opacity={1} fill={'#fef4bd'} />

        {/* Actor image */}
        <image href={e.url} x={e.c[0] - e.r} y={e.c[1] - e.r} width={e.r * 2} opacity={e.involvedInStep ? 1 : 0.4} />

        {/* Capture events on a transparent circle slighty bigger */}
        <circle
            style={{ cursor: 'pointer' }}
            cx={e.c[0]}
            cy={e.c[1]}
            r={e.r * 1.1}
            fill={'transparent'}
            onMouseEnter={() => dispatch({ type: 'slot-enter', id: e.id })}
            onMouseLeave={() => dispatch({ type: 'slot-leave', id: e.id })}
            onClick={() => dispatch({ type: 'slot-click', id: e.id })}
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
                    transform: e.hovered ? 'scale(1)' : 'scale(0)',
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

const connection = (e: ConnectionEl, dispatch: (e: CanvasEvent) => void) => (
    <g key={e.id}>
        {/* Hover highlight */}
        <path
            d={cubicBezier(e.from, e.q, e.to)}
            stroke={`#fef4bd`}
            strokeWidth={e.lit || e.hovered ? 25 : 0}
            fill="transparent"
        />

        {/* Path */}
        <path
            d={cubicBezier(e.from, e.q, e.to)}
            stroke={`rgba(0,0,0,${e.involvedInStep ? 1 : 0.1})`}
            strokeWidth={e.involvedInStep ? 5 : 2}
            fill="transparent"
        />

        {/* Capture mouse events on a (wider) transparent path */}
        <path
            d={cubicBezier(e.from, e.q, e.to)}
            style={{ cursor: 'pointer' }}
            stroke="transparent"
            strokeWidth={25}
            fill="transparent"
            onMouseEnter={() => dispatch({ type: 'conn-enter', id: e.id })}
            onMouseLeave={() => dispatch({ type: 'conn-leave', id: e.id })}
        />
    </g>
);

const interaction = (e: InteractionEl) => (
    <circle key={e.id} cx={e.c[0]} cy={e.c[1]} r={e.radius} fill={'hsl(0,0%,70%)'} opacity={0} /> // hidden!
);

const asset = (e: AssetEl) => <circle key={e.id} cx={e.c[0]} cy={e.c[1]} r={e.r} fill={'green'} />;

export function SVGNetworkCanvas(props: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={'100%'} height={'100%'} viewBox="0 0 600 600">
            {props.elems.map((e) => {
                switch (e.type) {
                    case 'slot':
                        return slot(e, props.onEvent);
                    case 'connection':
                        return connection(e, props.onEvent);
                    case 'interaction':
                        return interaction(e);
                    case 'asset':
                        return asset(e);
                }
            })}
        </svg>
    );
}

export interface Props {
    elems: CanvasElem[];
    onEvent: (e: CanvasEvent) => void;
}

export type CanvasElem = SlotEl | ConnectionEl | InteractionEl | AssetEl;

export interface AssetEl {
    type: 'asset';
    id: string;
    c: Vec;
    r: number;
    active?: boolean;
    url: string;
    lit?: boolean;
    hovered?: boolean;
}

export interface SlotEl {
    type: 'slot';
    id: string;
    c: Vec;
    r: number;
    selected?: boolean;
    hovered?: boolean;
    url: string;
    involvedInStep?: boolean;
}

export interface ConnectionEl {
    type: 'connection';
    id: string;
    from: Vec;
    to: Vec;
    q: Vec;
    involvedInStep?: boolean;
    lit?: boolean;
    hovered?: boolean;
}

export interface InteractionEl {
    type: 'interaction';
    id: string;
    c: Vec;
    radius: number;
}
