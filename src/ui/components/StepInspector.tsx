import { Typography } from '@material-ui/core';
import React from 'react';
import { ScenarioStepDescription } from '../../data/scenario/Scenario';
import { StepLabel } from './StepLabel';

interface Props {
    step: ScenarioStepDescription;
}

/** Shows the details of a scenario step */
export function StepInspector({ step }: Props) {
    return (
        <div style={{ padding: '1rem' }}>
            <Typography variant="h5">Geselecteerde actie</Typography>
            <StepLabel step={step} />
            <p style={{ marginBottom: '1em' }}>{step.action.long}</p>
            <Typography variant="h6">Uitkomsten</Typography>
            {step.outcomes.length > 0 ? (
                <ul>
                    {step.outcomes.map((o, i) => (
                        <li key={i}>{o}</li>
                    ))}
                </ul>
            ) : (
                <ul>
                    <li>
                        <small>- Geen -</small>
                    </li>
                </ul>
            )}
        </div>
    );
}
