import React from 'react';
import { CanvasElem } from './data/CanvasElem';
import { CanvasEvent } from './data/CanvasEvent';
import { ShapeSwitch } from './ShapeSwitch';

export const debug = false;

export function SVGNetworkCanvas(props: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={'100%'} height={'100%'} viewBox="0 0 600 600">
            {props.elems.map((e) => ShapeSwitch({ elem: e, onEvent: props.onEvent, debug }))}
        </svg>
    );
}

export interface Props {
    elems: CanvasElem[];
    onEvent: (e: CanvasEvent) => void;
}
