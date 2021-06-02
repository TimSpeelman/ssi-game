import { Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScenarioStepDescription } from '../../../../model/view/ScenarioStepDescription';
import { ScenarioActions } from '../../../../state/scenario/actions';
import { selectActiveStepSerialized, selectSteps } from '../../../../state/scenario/selectors';
import { StepDialog } from '../SequencePanel/StepDialog';
import { StepLabel } from './StepLabel';
import { StepNav } from './StepNav';

interface Props {
    step: ScenarioStepDescription;
}

/** Shows the details of a scenario step */
export function StepInspector({ step }: Props) {
    const steps = useSelector(selectSteps);
    const dispatch = useDispatch();
    const index = steps.findIndex((s) => step.action.id === s.action.id);
    const [editing, setEditing] = useState(false);
    const stepSerial = useSelector(selectActiveStepSerialized);
    return (
        <div>
            <StepDialog
                open={editing}
                isCreate={false}
                action={stepSerial}
                onSubmit={(step) => {
                    dispatch(ScenarioActions.UPDATE_STEP({ step }));
                    setEditing(false);
                }}
                onCancel={() => setEditing(false)}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">
                    Stap {index + 1} van {steps.length}
                </Typography>
                <StepNav />
            </div>

            {/* Same label as shown in the StepSequence */}
            <StepLabel step={step} onEdit={() => setEditing(true)} />

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
