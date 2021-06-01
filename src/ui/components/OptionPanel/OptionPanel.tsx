import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScenarioActions } from '../../../state/scenario/actions';
import { selectSnackbarIsOn } from '../../../state/scenario/selectors';

export function OptionPanel() {
    const snackbarIsOn = useSelector(selectSnackbarIsOn);
    const dispatch = useDispatch();
    return (
        <div style={{ padding: '1rem' }}>
            <Button variant={'outlined'} onClick={() => dispatch(ScenarioActions.TOGGLE_SNACKBAR())}>
                {snackbarIsOn ? 'Verberg Meldingen' : 'Toon Meldingen'}
            </Button>
        </div>
    );
}
