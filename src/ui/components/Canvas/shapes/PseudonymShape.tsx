import React from 'react';
import { PseudonymEl } from '../data/PseudonymEl';
import { ShapeProps } from '../ShapeProps';

export function PseudonymShape({ elem: e, onEvent: dispatch }: ShapeProps<PseudonymEl>) {
    return (
        <g key={e.id} className={'pseudonym'}>
            {/* Selection or hover */}
            <circle
                cx={e.c[0]}
                cy={e.c[1]}
                r={e.selected || e.hovered ? e.r * 1.3 : 0}
                opacity={0.9}
                fill={'#fef4bd'}
            />

            <circle cx={e.c[0]} cy={e.c[1]} r={e.r} fill={'#aaa'} />

            {/* Pseudonym image */}
            <image href={e.url} x={e.c[0] - e.r * 0.75} y={e.c[1] - e.r * 0.75} width={e.r * 1.5} />

            <circle
                cx={e.c[0]}
                cy={e.c[1]}
                style={{ cursor: 'pointer' }}
                r={e.r * 1.2}
                fill={'transparent'}
                onClick={() => dispatch({ type: 'pseudonym-click', id: e.id })}
                onMouseEnter={() => dispatch({ type: 'pseudonym-enter', id: e.id })}
                onMouseLeave={() => dispatch({ type: 'pseudonym-leave', id: e.id })}
            />
        </g>
    );
}
