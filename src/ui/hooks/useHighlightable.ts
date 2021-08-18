import React, { useLayoutEffect } from 'react';
import { useHighlightsContext } from '../HighlightsContext';

/**
 * Registers an HTML element as a highlightable element by passing its coordinates to the Highlights Context
 *
 * If expand is set to true, the highlight will be drawn slightly larger than the element's bounding box.
 */
export function useHighlightable(id: string, ref: React.RefObject<HTMLElement>, expand?: boolean) {
    const ctx = useHighlightsContext();

    function measureObject() {
        if (ref.current) {
            const { top, right, bottom, left } = ref.current.getBoundingClientRect();
            const highlight = { top, right, bottom, left, expand };
            console.log('Measured', id, highlight);
            ctx.register(id, highlight);
        }
    }

    useLayoutEffect(() => {
        measureObject();
        window.addEventListener('resize', measureObject);
        return () => window.removeEventListener('resize', measureObject);
    }, [ref.current]);
}
