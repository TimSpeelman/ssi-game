import { Fab } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectActions } from '../../../state/scenario/actions';
import { selectActiveStepDesc, selectActiveStepIndex } from '../../../state/scenario/selectors';
import { useLang } from '../../hooks/useLang';

export function TimeControlCtr() {
    const dispatch = useDispatch();
    const currentStep = useSelector(selectActiveStepDesc);
    const currentStepIndex = useSelector(selectActiveStepIndex);

    const { dict, lang } = useLang();
    return (
        <div className="time-navigation">
            {currentStep ? (
                <span>
                    <strong>
                        {dict.step} {currentStepIndex + 1}:{' '}
                    </strong>
                    {currentStep.action.description[lang]}
                </span>
            ) : (
                <span></span>
            )}
            <Fab
                style={{ marginRight: '1rem', marginLeft: '1rem' }}
                onClick={() => dispatch(ProjectActions.PREV_STEP())}
            >
                <NavigateBefore />
            </Fab>
            <Fab onClick={() => dispatch(ProjectActions.NEXT_STEP())}>
                <NavigateNext />
            </Fab>
        </div>
    );
}
