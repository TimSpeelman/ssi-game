import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectSteps } from '../../../state/scenario/selectors';
import { StepNav } from './StepNav';

export function InitialStateInspector() {
    const steps = useSelector(selectSteps);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Begintoestand</Typography>
                <StepNav />
            </div>

            {steps.length > 0
                ? 'Navigeer door de stappen om hier gedetailleerde informatie te zien.'
                : 'Je hebt nog geen stappen. Maak eerst een stap aan.'}
        </div>
    );
}
