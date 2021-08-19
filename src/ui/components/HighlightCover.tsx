import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';

export interface Props {
    rect?: { top: number; right: number; bottom: number; left: number };
    expand?: number;
    on: boolean;
}

export function HighlightCover(props: Props) {
    const off = !props.on || !props.rect;
    const originalHL = props.rect || { top: 0, right: 0, bottom: 0, left: 0 };
    const d = (props.expand || 0) * 10;
    const hl = {
        top: originalHL.top - d,
        right: originalHL.right + d,
        bottom: originalHL.bottom + d,
        left: originalHL.left - d,
    };

    const baseCss: CSSProperties = {
        position: 'absolute',
        background: '#333',
        transition: 'all .5s',
        transitionTimingFunction: 'easeInOutCubic',
        pointerEvents: props.on ? 'visible' : 'none',
    };

    return (
        <div
            style={{
                position: 'fixed',
                opacity: props.on ? 0.6 : 0,
                zIndex: 10000,
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                transition: 'all .5s ',
                pointerEvents: 'none',
            }}
        >
            {/* Top bar */}
            <div style={{ ...baseCss, left: 0, top: 0, right: 0, height: off ? '50%' : Math.max(0, hl.top) }} />
            {/* Right bar */}
            <div style={{ ...baseCss, left: off ? '50%' : hl.right, top: 0, right: 0, bottom: 0 }} />
            {/* Bottom bar */}
            <div style={{ ...baseCss, left: 0, top: off ? '50%' : hl.bottom, right: 0, bottom: 0 }} />
            {/* Left bar */}
            <div style={{ ...baseCss, left: 0, top: 0, width: off ? '50%' : Math.max(0, hl.left), bottom: 0 }} />
        </div>
    );
}
