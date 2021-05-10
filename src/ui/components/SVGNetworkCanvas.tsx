import React from 'react';
import { Vec } from '../../util/vec';

const debug = false;

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

const slot = (e: SlotEl) => (
    <g key={e.id}>
        {/* Background for hiding edges */}
        <circle cx={e.c[0]} cy={e.c[1]} r={e.r * 1.2} opacity={1} fill={'#eee'} />

        {/* Actor image, vague */}
        <image href={e.url} x={e.c[0] - e.r} y={e.c[1] - e.r} width={e.r * 2} opacity={e.showImage ? 0.1 : 0} />
    </g>
);

const actor = (e: ActorEl, dispatch: (e: CanvasEvent) => void) => (
    <g key={e.id}>
        {/* Selection or hover */}
        <circle cx={e.c[0]} cy={e.c[1]} r={e.selected || e.hovered ? e.r * 1.1 : 0} opacity={0.9} fill={'#fef4bd'} />

        {/* Actor image */}
        <image href={e.url} x={e.c[0] - e.r} y={e.c[1] - e.r} width={e.r * 2} opacity={e.involvedInStep ? 1 : 0.4} />

        {/* Capture events on a transparent circle slighty bigger */}
        <circle
            style={{ cursor: 'pointer' }}
            cx={e.c[0]}
            cy={e.c[1]}
            r={e.r * 1.1}
            fill={debug ? 'rgba(0,0,255,0.1)' : 'transparent'}
            onMouseEnter={() => dispatch({ type: 'slot-enter', id: e.id })}
            onMouseLeave={() => dispatch({ type: 'slot-leave', id: e.id })}
            onClick={() => dispatch({ type: 'slot-click', id: e.id })}
        />
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
            stroke={debug ? 'rgba(0,255,255,0.1)' : 'transparent'}
            strokeWidth={25}
            fill="transparent"
            onMouseEnter={() => dispatch({ type: 'conn-enter', id: e.id })}
            onMouseLeave={() => dispatch({ type: 'conn-leave', id: e.id })}
        />
    </g>
);

const asset = (e: AssetEl) => <circle key={e.id} cx={e.c[0]} cy={e.c[1]} r={e.r} fill={'green'} />;

const spotlight = (e: Spotlight) => (
    <g>
        <rect x={0} y={0} width={600} height={600} fill={'white'} />
        <circle cx={e.c[0]} cy={e.c[1]} r={e.r} fill={'black'} filter={'url(#blurFilter)'} />
    </g>
);
const spotlightCover = (w: number, h: number) => (
    <rect x={0} y={0} width={w} height={h} mask="url(#spotlight)" fill={'rgba(0,0,0,0.3'} />
);

export function SVGNetworkCanvas(props: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={'100%'} height={'100%'} viewBox="0 0 600 600">
            <defs>
                <filter id="blurFilter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
                </filter>
                <mask id="spotlight">{props.spotlight && spotlight(props.spotlight)}</mask>
            </defs>
            {props.elems.map((e) => {
                switch (e.type) {
                    case 'slot':
                        return slot(e);
                    case 'actor':
                        return actor(e, props.onEvent);
                    case 'connection':
                        return connection(e, props.onEvent);
                    case 'asset':
                        return asset(e);
                }
            })}
            {spotlightCover(600, 600)}
        </svg>
    );
}

export interface Props {
    elems: CanvasElem[];
    onEvent: (e: CanvasEvent) => void;
    spotlight?: Spotlight;
}

export type CanvasElem = SlotEl | ActorEl | ConnectionEl | AssetEl;

export interface Spotlight {
    c: Vec;
    r: number;
    on: boolean;
}

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

export interface ActorEl {
    type: 'actor';
    id: string;
    c: Vec;
    r: number;
    selected?: boolean;
    hovered?: boolean;
    url: string;
    involvedInStep?: boolean;
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
    showImage: boolean;
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
