import { Tooltip, TooltipProps } from '@material-ui/core';
import React from 'react';
import { ReactElement } from 'react-markdown';

export interface Props extends TooltipProps {
    on?: boolean;
    children: ReactElement;
}

export function OptionalTooltip({ on, ...props }: Props) {
    return (
        <Tooltip {...props} disableFocusListener={!on} disableHoverListener={!on} disableTouchListener={!on}>
            {props.children}
        </Tooltip>
    );
}
