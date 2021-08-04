import { fas } from '@fortawesome/free-solid-svg-icons';
import React, { SVGProps } from 'react';
import { ucFirst } from '../../../util/util';

interface Props extends SVGProps<SVGSVGElement> {
    icon: string;
    pathProps?: SVGProps<SVGPathElement>;
}

export const kebabToCamelCase = (str: string) => str.split('-').map(ucFirst).join('');

export function FontAwesomeIconShape({ icon, pathProps, ...svgProps }: Props) {
    const iconName = 'fa' + kebabToCamelCase(icon);
    const faIcon = fas[iconName];
    if (!faIcon) {
        console.error('Unknown icon ' + icon, iconName);

        return <svg></svg>;
    } else {
        const [w, h, _, __, path] = faIcon.icon;
        const d = typeof path === 'string' ? path : path.join(' ');
        return (
            <svg {...svgProps} viewBox={`0 0 ${w} ${h}`}>
                <path d={d} {...pathProps}></path>
            </svg>
        );
    }
}
