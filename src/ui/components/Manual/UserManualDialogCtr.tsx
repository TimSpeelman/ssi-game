import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameActions } from '../../../state/actions';
import { selectManualOpen } from '../../../state/selectors';
import { UserManualDialog } from './UserManualDialog';

export function UserManualDialogCtr() {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectManualOpen);

    return <UserManualDialog handleClose={() => dispatch(GameActions.HIDE_MANUAL())} open={isOpen} />;
}
