import { Button, Typography } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { StepDesc } from '../../../../model/description/Step/StepDesc';
import { selectStepDescs } from '../../../../state/selectors';
import { formatL } from '../../../../util/util';
import { useDialog } from '../../../dialogs/dialogs';
import { useLang } from '../../../hooks/useLang';
import { replaceInternalResourceUrlStrings } from '../../elements/replaceInternalResourceUrlStrings';
import { StepLabel } from './StepLabel';

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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Typography variant="h6">{formatL(dict.stepXOutOfY, [index + 1, steps.length])}</Typography>
                {/* <StepNav /> */}

                <Button variant="outlined" onClick={() => openDialog('EditStep', { stepId: step.action.id })}>
                    <Edit /> {dict.misc.btnEdit}
                </Button>
            </div>

            {/* Same label as shown in the StepSequence */}
            <StepLabel step={step} />

            {/* Optional validation errors */}
            {!step.success && (
                <Fragment>
                    <Typography variant="h6" style={{ color: 'red' }}>
                        {dict.stepInspector.msgStepIsFailing}
                    </Typography>
                    <ul>
                        {step.validation
                            .filter((v) => !v.success)
                            .map((v, i) => (
                                <li key={i}>{v.message[lang]}</li>
                            ))}
                    </ul>
                </Fragment>
            )}

            {/* Outcome list */}
            <Typography variant="h6">{dict.stepInspector.titleOutcomes}</Typography>
            {step.outcomes.length > 0 ? (
                <ul>
                    {step.outcomes.map((o, i) => (
                        <li key={i}>{replaceInternalResourceUrlStrings(o[lang])}</li>
                    ))}
                </ul>
            ) : (
                <ul>
                    <li>
                        <small>- {dict.misc.emptyListIndicator} -</small>
                    </li>
                </ul>
            )}
        </div>
    );
}
