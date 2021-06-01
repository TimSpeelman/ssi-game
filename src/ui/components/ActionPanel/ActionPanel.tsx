import React from 'react';
import { useSelector } from 'react-redux';
import { selectActiveStep } from '../../../state/scenario/selectors';
import { StepInspector } from './StepInspector';

/** The InfoPanel describes the Scenario's Information */
export function ActionPanel() {
    const selectedStep = useSelector(selectActiveStep);

    return <div>{selectedStep ? <StepInspector step={selectedStep} /> : 'Begintoestand'}</div>;
}
