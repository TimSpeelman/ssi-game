import { RefObject, useLayoutEffect, useState } from 'react';

export interface BoundingBox {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

/** Given a query selector, measures the child matching the query selector after rendering and on window resize  */
export function useChildMeasurements(rootRef: RefObject<HTMLElement>, selector: string | undefined) {
    const [boundingBox, setBoundingBox] = useState<BoundingBox | undefined>(undefined);

    function measureChild() {
        if (selector) {
            const child = rootRef.current?.querySelector(selector);
            const childRect = child?.getBoundingClientRect();
            setBoundingBox(childRect);
        } else {
            setBoundingBox(undefined);
        }
    }

    useLayoutEffect(() => {
        measureChild();
        window.addEventListener('resize', measureChild);
        return () => window.removeEventListener('resize', measureChild);
    }, [rootRef.current, selector]);

    return boundingBox;
}
