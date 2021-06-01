import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { ScenarioStepDescription } from '../../../model/view/ScenarioStepDescription';
import { StepLabel } from '../StepLabel';

interface Props {
    step: ScenarioStepDescription;
}

/** Shows the details of a scenario step */
export function StepInspector({ step }: Props) {
    return (
        <div style={{ padding: '1rem' }}>
            <Typography variant="h5">Geselecteerde actie</Typography>

            {/* Same label as shown in the StepSequence */}
            <StepLabel step={step} />

            {/* Additional explanation */}
            <p style={{ marginBottom: '1em' }}>{step.action.long}</p>

            {/* Optional validation errors */}
            {!step.success && (
                <Fragment>
                    <Typography variant="h6" style={{ color: 'red' }}>
                        Deze stap mislukt..
                    </Typography>
                    <ul>
                        {step.validation
                            .filter((v) => !v.success)
                            .map((v, i) => (
                                <li key={i}>{v.message}</li>
                            ))}
                    </ul>
                </Fragment>
            )}

            {/* Outcome list */}
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
