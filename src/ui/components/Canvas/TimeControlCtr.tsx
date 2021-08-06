import { IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectActions } from '../../../state/project/actions';
import { selectActiveStepDesc, selectActiveStepIndex, selectNumberOfSteps } from '../../../state/selectors';
import { useLang } from '../../hooks/useLang';

export function TimeControlCtr() {
    const dispatch = useDispatch();
    const currentStep = useSelector(selectActiveStepDesc);
    const currentStepIndex = useSelector(selectActiveStepIndex);
    const numSteps = useSelector(selectNumberOfSteps);

    const { dict, lang } = useLang();
    return (
        <div className="time-navigation">
            <IconButton color={'inherit'} onClick={() => dispatch(ProjectActions.PREV_STEP())}>
                <ChevronLeft />
            </IconButton>
            <span>
                <strong>
                    {dict.step} {currentStepIndex + 1} {dict.outOf} {numSteps}
                </strong>
            </span>
            <IconButton
                color={'inherit'}
                onClick={() => dispatch(ProjectActions.NEXT_STEP())}
                style={{ marginRight: '1rem' }}
            >
                <ChevronRight />
            </IconButton>
            {currentStep ? <span> {currentStep.action.title[lang]}</span> : <span></span>}
        </div>
    );
}
