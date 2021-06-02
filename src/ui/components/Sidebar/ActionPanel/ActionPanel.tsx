import React from 'react';
import { useSelector } from 'react-redux';
import { selectActiveStepDesc } from '../../../../state/scenario/selectors';
import { InitialStateInspector } from './InitialStateInspector';
import { StepInspector } from './StepInspector';

/** The InfoPanel describes the Scenario's Information */
export function ActionPanel() {
    const selectedStep = useSelector(selectActiveStepDesc);

    return (
        <div style={{ padding: '1rem' }}>
            {selectedStep ? <StepInspector step={selectedStep} /> : <InitialStateInspector />}
        </div>
    );
}
