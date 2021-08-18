import React, { createContext, useEffect, useState } from 'react';
import { omit } from '../util/util';

export interface IHighlightsContext {
    highlightedId: string | undefined;
    highlightedRect: Highlight | undefined;
    register: (id: string, highlight: Highlight) => () => void;
    highlight: (id: string) => void;
}

export interface Highlight {
    top: number;
    right: number;
    bottom: number;
    left: number;
    /** If set to true, the highlight will be drawn slightly larger than the rect (useful for dark surfaces) */
    expand?: boolean;
}

export const HighlightsContext = createContext<IHighlightsContext>({} as IHighlightsContext);

export const HighlightsContextProvider: React.FC = ({ children }) => {
    const [highlightedId, setLit] = useState<string | undefined>(undefined);

    const [highlights, setHighlights] = useState<Record<string, Highlight>>({});

    function register(id: string, highlight: Highlight) {
        setHighlights((h) => ({ ...h, [id]: highlight }));

        return function unregister() {
            setHighlights((h) => omit(id)(h));
        };
    }

    function highlight(id: string | undefined) {
        setLit(id);
    }

    const highlightedRect = !!highlightedId ? highlights[highlightedId] : undefined;

    useEffect(() => {
        if (highlightedId && !(highlightedId in highlights)) console.warn('HighlightID not registered:', highlightedId);
    }, [highlightedId]);

    const context = {
        register,
        highlight,
        highlightedId,
        highlightedRect,
    };

    return <HighlightsContext.Provider value={context}>{children}</HighlightsContext.Provider>;
};

export const useHighlightsContext = () => React.useContext(HighlightsContext);
