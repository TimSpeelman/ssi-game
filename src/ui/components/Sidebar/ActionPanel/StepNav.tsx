import { Button } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ScenarioActions } from '../../../../state/scenario/actions';

/** Shows the details of a scenario step */
export function StepNav() {
    const dispatch = useDispatch();

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
