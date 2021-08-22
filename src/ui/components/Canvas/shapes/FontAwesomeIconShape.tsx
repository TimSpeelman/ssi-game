import { fas } from '@fortawesome/free-solid-svg-icons';
import React, { SVGProps } from 'react';
import { ucFirst } from '../../../../util/util';
import { Vec } from '../../../../util/vec';

interface Props extends SVGProps<SVGSVGElement> {
    icon: string;
    cx?: number;
    cy?: number;
    height: number;
    color?: string;
    pathProps?: Omit<SVGProps<SVGPathElement>, 'width' | 'height'>;
}

export const kebabToCamelCase = (str: string) => str.split('-').map(ucFirst).join('');

/** Always square */
export function FontAwesomeIconShape({ icon, pathProps, cx, cy, color, ...svgProps }: Props) {
    const iconName = 'fa' + kebabToCamelCase(icon);
    const faIcon = fas[iconName];
    if (!faIcon) {
        console.error('Unknown icon ' + icon, iconName);

        return <svg></svg>;
    } else {
        const [w, h, _, __, path] = faIcon.icon;
        const [[x0, y0], [x1, y1]] = fitRectangleInSquare(w, h);
        const d = typeof path === 'string' ? path : path.join(' ');
        const edgeLength = svgProps.height;
        const x = cx ? cx - edgeLength / 2 : svgProps.x || 0;
        const y = cy ? cy - edgeLength / 2 : svgProps.y || 0;

        return (
            <g
                style={{
                    transform: `translate(${x}px, ${y}px)`,
                }}
            >
                <svg
                    {...svgProps}
                    viewBox={`${x0} ${y0} ${x1} ${y1}`}
                    preserveAspectRatio="xMinYMin meet"
                    width={edgeLength}
                    height={edgeLength}
                    x={0}
                    y={0}
                >
                    <path d={d} {...pathProps} fill={color}></path>
                </svg>
            </g>
        );
    }
}

/** Given a rectangle A, give the coordinates of the smallest possible square that surrounds A */
function fitRectangleInSquare(w: number, h: number): [Vec, Vec] {
    if (w > h) {
        const d = (w - h) / 2;
        return [
            [0, -d],
            [w, h + 2 * d],
        ];
    } else {
        const d = (h - w) / 2;
        return [
            [-d, 0],
            [w + 2 * d, h],
        ];
    }
}
