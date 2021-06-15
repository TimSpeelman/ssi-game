import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectStepDescs } from '../../../../state/scenario/selectors';
import { useLang } from '../../../hooks/useLang';
import { StepNav } from './StepNav';

export function InitialStateInspector() {
    const steps = useSelector(selectStepDescs);
    const { dict } = useLang();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">{dict.startingState}</Typography>
                <StepNav />
            </div>

            {steps.length > 0
                ? dict.initialStateInspector_msgNavigateSteps
                : dict.initialStateInspector_msgYouHaveNoSteps}
        </div>
    );
}
