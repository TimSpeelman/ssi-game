import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameActions } from '../../../../state/scenario/actions';
import { selectSnackbarIsOn } from '../../../../state/scenario/selectors';
import { useLang } from '../../../hooks/useLang';

export function OptionPanel() {
    const snackbarIsOn = useSelector(selectSnackbarIsOn);
    const dispatch = useDispatch();
    const { dict } = useLang();
    return (
        <div style={{ padding: '1rem' }}>
            <Typography variant="h6">{dict.titleOptions}</Typography>
            <Button variant={'outlined'} onClick={() => dispatch(GameActions.TOGGLE_SNACKBAR())}>
                {snackbarIsOn ? dict.btnHideSnackbar : dict.btnShowSnackbar}
            </Button>
        </div>
    );
}
