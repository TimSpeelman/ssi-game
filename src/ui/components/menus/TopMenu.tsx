import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Help, Menu, Redo, Undo } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { GameActions } from '../../../state/actions';
import { selectActiveProjectName, selectRedoable, selectUndoable } from '../../../state/selectors';
import { useLang } from '../../hooks/useLang';
import { LanguageMenu } from './LanguageMenu';

export function TopMenu() {
    const undoable = useSelector(selectUndoable);
    const redoable = useSelector(selectRedoable);
    const projectName = useSelector(selectActiveProjectName);

    const { dict } = useLang();

    const dispatch = useDispatch();

    const undo = () => dispatch(ActionCreators.undo());

    const redo = () => dispatch(ActionCreators.redo());

    const showManual = () => dispatch(GameActions.SHOW_MANUAL());

    const openProjectDrawer = () => dispatch(GameActions.OPEN_PROJECT_DRAWER());

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" onClick={openProjectDrawer} color={'inherit'}>
                    <Menu />
                </IconButton>
                <div style={{ display: 'flex', flexGrow: 1 }}>
                    <Typography variant="h6" style={{ marginRight: '.5rem' }}>
                        Identity Game | {projectName === '' ? dict.untitledProject : projectName}
                    </Typography>
                </div>
                <Button color={'inherit'} onClick={undo} style={{ marginRight: '.5rem' }} disabled={!undoable}>
                    <Undo />
                </Button>
                <Button color={'inherit'} onClick={redo} style={{ marginRight: '.5rem' }} disabled={!redoable}>
                    <Redo />
                </Button>
                <Button color={'inherit'} onClick={showManual} style={{ marginRight: '.5rem' }}>
                    <Help />
                </Button>

                <LanguageMenu />
            </Toolbar>
        </AppBar>
    );
}
