import { Divider } from '@material-ui/core';
import React from 'react';
import { ScenarioStepDescription } from '../../data/scenario/Scenario';
import { StepLabel } from './StepLabel';

interface Props {
    step: ScenarioStepDescription;
}

/** Shows the details of a scenario step */
export function StepInspector({ step }: Props) {
    return (
        <div>
            <h1>Geselecteerde actie</h1>
            <StepLabel step={step} />
            <p>{step.action.long}</p>
            <Divider />
            <h2>Uitkomsten</h2>
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
