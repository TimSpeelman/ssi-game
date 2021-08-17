import React from 'react';
import { Vec } from '../../../../util/vec';
import { ConnectionEl } from '../data/ConnectionEl';
import { ShapeProps } from './ShapeProps';

export const cubicBezier = (a: Vec, q: Vec, b: Vec) => `M ${a[0]} ${a[1]} Q ${q[0]} ${q[1]} ${b[0]} ${b[1]}`;

export function ConnectionShape({ elem: e, onEvent: dispatch, debug }: ShapeProps<ConnectionEl>) {
    return (
        <g key={e.id}>
            {/* Hover highlight */}
            <path
                d={cubicBezier(e.from, e.q, e.to)}
                stroke={`#fef4bd`}
                strokeWidth={e.lit || (e.clickable && e.hovered) ? 25 : 0}
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
                style={{ cursor: e.clickable ? 'pointer' : 'default' }}
                stroke={debug ? 'rgba(0,255,255,0.1)' : 'transparent'}
                strokeWidth={25}
                fill="transparent"
                onMouseEnter={() => dispatch({ type: 'conn-enter', id: e.id })}
                onMouseLeave={() => dispatch({ type: 'conn-leave', id: e.id })}
                onClick={() => dispatch({ type: 'conn-click', id: e.id })}
            />
        </g>
    );
}
