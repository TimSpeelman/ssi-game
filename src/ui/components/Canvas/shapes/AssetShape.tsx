import React from 'react';
import { AssetEl } from '../data/AssetEl';
import { FontAwesomeIconShape } from '../FontAwesomeIconShape';
import { ShapeProps } from '../ShapeProps';

export function AssetShape({ elem: e, onEvent: dispatch }: ShapeProps<AssetEl>) {
    return (
        <g key={e.id}>
            {/* Selection or hover */}
            <circle
                cx={e.c[0]}
                cy={e.c[1]}
                r={e.selected || e.hovered ? e.r * 1.3 : 0}
                opacity={0.9}
                fill={'#fef4bd'}
            />

            <circle cx={e.c[0]} cy={e.c[1]} r={e.r} fill={'#aaa'} />
            {e.numberOfChildren > 0 && (
                <text x={e.c[0]} y={e.c[1]} textAnchor="middle" className="asset-number-of-children">
                    {e.numberOfChildren}
                </text>
            )}

            {e.url && <image href={e.url} x={e.c[0] - e.r} y={e.c[1] - e.r} width={e.r * 2} opacity={0.9} />}

            {e.image?.type === 'fa-icon' &&
                FontAwesomeIconShape({
                    icon: e.image.name,
                    cx: e.c[0],
                    cy: e.c[1],
                    height: e.r * 2 * 0.8,
                    color: e.image.color,
                })}

            <circle
                cx={e.c[0]}
                cy={e.c[1]}
                style={{ cursor: 'pointer' }}
                r={e.r * 1.2}
                fill={'transparent'}
                onClick={() => dispatch({ type: 'asset-click', id: e.id })}
                onMouseEnter={() => dispatch({ type: 'asset-enter', id: e.id })}
                onMouseLeave={() => dispatch({ type: 'asset-leave', id: e.id })}
            />
        </g>
    );
}
