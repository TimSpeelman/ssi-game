import React from 'react';
import { AssetEl } from '../data/AssetEl';
import { FontAwesomeIconShape } from './FontAwesomeIconShape';
import { ShapeProps } from './ShapeProps';

export function AssetShape({ elem: e, onEvent: dispatch }: ShapeProps<AssetEl>) {
    return (
        <g key={e.id} opacity={e.transparent && !e.hovered && !e.selected ? 0.3 : 1} id={`asset-${e.id}`}>
            {/* Selection or hover */}
            <circle cx={e.c[0]} cy={e.c[1]} r={e.selected || e.hovered ? e.r * 1.3 : 0} fill={'#fef4bd'} />

            {/* Background */}
            <circle cx={e.c[0]} cy={e.c[1]} r={e.r} fill={'#aaa'} />

            {e.numberOfChildren > 0 && (
                <text
                    style={{ transform: `translate(${e.c[0]}px, ${e.c[1]}px)` }}
                    textAnchor="middle"
                    className="asset-number-of-children"
                >
                    {e.numberOfChildren}
                </text>
            )}

            {e.image?.type === 'image' && (
                <image href={e.image.url} x={e.c[0] - e.r} y={e.c[1] - e.r} width={e.r * 2} />
            )}

            {e.image?.type === 'fa-icon' &&
                FontAwesomeIconShape({
                    icon: e.image.name,
                    cx: e.c[0],
                    cy: e.c[1],
                    height: e.r * 2 * 0.65,
                    color: e.image.color,
                })}

            {e.abbr && (
                <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                        fontWeight: 'bold',
                        fontSize: e.r * 0.7,
                        transform: `translate(${e.c[0]}px, ${e.c[1]}px)`,
                    }}
                >
                    {e.abbr}
                </text>
            )}

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
