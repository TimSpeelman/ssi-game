import React from 'react';
import { useSelector } from 'react-redux';
import { selectActiveStep } from '../../../state/scenario/selectors';
import { StepInspector } from './StepInspector';

/** The InfoPanel describes the Scenario's Information */
export function ActionPanel() {
    const selectedStep = useSelector(selectActiveStep);

    return (
        <div style={{ padding: '1rem' }}>{selectedStep ? <StepInspector step={selectedStep} /> : 'Begintoestand'}</div>
    );
}
