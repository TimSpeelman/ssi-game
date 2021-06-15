import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { StepDesc } from '../../../../model/description/Step/StepDesc';
import { selectStepDescs } from '../../../../state/scenario/selectors';
import { useDialog } from '../../../dialogs/dialogs';
import { useLang } from '../../../hooks/useLang';
import { StepLabel } from './StepLabel';
import { StepNav } from './StepNav';

interface Props {
    step: StepDesc;
}

/** Shows the details of a scenario step */
export function StepInspector({ step }: Props) {
    const steps = useSelector(selectStepDescs);
    const index = steps.findIndex((s) => step.action.id === s.action.id);
    const { openDialog } = useDialog();
    const { dict, lang } = useLang();
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">
                    {dict.step} {index + 1} {dict.outOf} {steps.length}
                </Typography>
                <StepNav />
            </div>

            {/* Same label as shown in the StepSequence */}
            <StepLabel step={step} onEdit={() => openDialog('EditStep', { stepId: step.action.id })} />

            {/* Additional explanation */}
            <p style={{ marginBottom: '1em' }}>{step.action.long ? step.action.long[lang] : ''}</p>

            {/* Optional validation errors */}
            {!step.success && (
                <Fragment>
                    <Typography variant="h6" style={{ color: 'red' }}>
                        {dict.msgStepIsFailing}
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
            <Typography variant="h6">{dict.titleOutcomes}</Typography>
            {step.outcomes.length > 0 ? (
                <ul>
                    {step.outcomes.map((o, i) => (
                        <li key={i}>{o[lang]}</li>
                    ))}
                </ul>
            ) : (
                <ul>
                    <li>
                        <small>- {dict.emptyListIndicator} -</small>
                    </li>
                </ul>
            )}
        </div>
    );
}
