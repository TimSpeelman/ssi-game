import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectStepDescs } from '../../../../state/selectors';
import { useLang } from '../../../hooks/useLang';

export function InitialStateInspector() {
    const steps = useSelector(selectStepDescs);
    const { dict } = useLang();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Typography variant="h6">{dict.startingState}</Typography>
            </div>

            {steps.length > 0
                ? dict.initialStateInspector.msgNavigateSteps
                : dict.initialStateInspector.msgYouHaveNoSteps}
        </div>
    );
}
