import { CanvasElem } from '../data/CanvasElem';
import { CanvasEvent } from '../data/CanvasEvent';

export interface ShapeProps<El extends CanvasElem> {
    elem: El;
    onEvent: (e: CanvasEvent) => void;
    debug?: boolean;
}
