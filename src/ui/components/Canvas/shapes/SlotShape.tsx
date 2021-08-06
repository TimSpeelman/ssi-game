import React from 'react';
import { SlotEl } from '../data/SlotEl';
import { ShapeProps } from './ShapeProps';

export function SlotShape({ elem: e, onEvent: dispatch }: ShapeProps<SlotEl>) {
    return (
        <g key={e.id}>
            {/* Background for hiding edges */}
            <circle cx={e.c[0]} cy={e.c[1]} r={e.r * 1.2} opacity={1} fill={'#eee'} />

            {/* Actor image, vague */}
            <image href={e.url} x={e.c[0] - e.r} y={e.c[1] - e.r} width={e.r * 2} opacity={e.showImage ? 0.1 : 0} />
        </g>
    );
}
