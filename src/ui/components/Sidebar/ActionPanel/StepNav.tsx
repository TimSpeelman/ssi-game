import { Button } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ProjectActions } from '../../../../state/project/actions';

/** Shows the details of a scenario step */
export function StepNav() {
    const dispatch = useDispatch();

    return (
        <div>
            <Button onClick={() => dispatch(ProjectActions.PREV_STEP())}>
                <NavigateBefore />
            </Button>
            <Button onClick={() => dispatch(ProjectActions.NEXT_STEP())}>
                <NavigateNext />
            </Button>
        </div>
    );
}
