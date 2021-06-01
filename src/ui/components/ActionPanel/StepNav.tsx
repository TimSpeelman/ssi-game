import { Button } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScenarioActions } from '../../../state/scenario/actions';
import { selectActiveStepIndex, selectSteps } from '../../../state/scenario/selectors';

/** Shows the details of a scenario step */
export function StepNav() {
    const steps = useSelector(selectSteps);
    const stepIndex = useSelector(selectActiveStepIndex);
    const dispatch = useDispatch();
    // const index = steps.findIndex((s) => stepIndex.action.id === s.action.id);

    return (
        <div>
            <Button onClick={() => dispatch(ScenarioActions.PREV_STEP())}>
                <NavigateBefore />
            </Button>
            <Button onClick={() => dispatch(ScenarioActions.NEXT_STEP())}>
                <NavigateNext />
            </Button>
        </div>
    );
}
