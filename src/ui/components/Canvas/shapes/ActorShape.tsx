import React from 'react';
import { ActorEl } from '../data/ActorEl';
import { FontAwesomeIconShape } from './FontAwesomeIconShape';
import { ShapeProps } from './ShapeProps';

export function ActorShape({ elem: e, onEvent: dispatch, debug }: ShapeProps<ActorEl>) {
    return (
        <g key={e.id} id={`actor-${e.id}`}>
            {/* Selection or hover */}
            <circle
                cx={e.c[0]}
                cy={e.c[1]}
                r={e.selected || e.hovered ? e.r * 1.1 : 0}
                opacity={0.9}
                fill={'#fef4bd'}
            />

            {/* Actor image or icon */}
            {e.image?.type === 'image' && (
                <image
                    href={e.image.url}
                    x={e.c[0] - e.r}
                    y={e.c[1] - e.r}
                    width={e.r * 2}
                    opacity={e.involvedInStep ? 1 : 0.4}
                />
            )}

            {e.image?.type === 'fa-icon' &&
                FontAwesomeIconShape({
                    icon: e.image.name,
                    cx: e.c[0],
                    cy: e.c[1],
                    height: e.r * 2 * 0.65,
                    color: e.image.color,
                })}

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
}
