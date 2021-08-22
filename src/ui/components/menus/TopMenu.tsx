import { AppBar, Button, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { Help, Lock, LockOpen, Menu, Redo, Undo } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { GameActions } from '../../../state/actions';
import { selectActiveProjectName, selectEditing, selectRedoable, selectUndoable } from '../../../state/selectors';
import { useLang } from '../../hooks/useLang';
import { Tour } from '../../tour/Tour';
import { LanguageMenu } from './LanguageMenu';

export interface Props {
    tour?: Tour;
}

export function TopMenu(props: Props) {
    const undoable = useSelector(selectUndoable);
    const redoable = useSelector(selectRedoable);
    const projectName = useSelector(selectActiveProjectName);
    const editing = useSelector(selectEditing);

    const { tour } = props;
    const { dict, lang } = useLang();

    const dispatch = useDispatch();

    const toggleEditing = () => dispatch(GameActions.TOGGLE_EDITING({}));

    const undo = () => dispatch(ActionCreators.undo());

    const redo = () => dispatch(ActionCreators.redo());

    const showManual = () => dispatch(GameActions.SHOW_MANUAL());

    const openProjectDrawer = () => dispatch(GameActions.SHOW_PROJECT_DRAWER());

    const title = tour ? tour.title[lang] : projectName === '' ? dict.untitledProject : projectName;

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton id="btn-project-drawer" edge="start" onClick={openProjectDrawer} color={'inherit'}>
                    <Menu />
                </IconButton>
                <div style={{ display: 'flex', flexGrow: 1 }} id="project-title">
                    <Typography variant="h6" style={{ marginRight: '.5rem' }}>
                        Identity Game | {title}
                    </Typography>
                </div>

                {editing && (
                    <Button
                        id="btn-undo"
                        color={'inherit'}
                        onClick={undo}
                        style={{ marginRight: '.5rem' }}
                        disabled={!undoable}
                    >
                        <Undo />
                    </Button>
                )}
                {editing && (
                    <Button
                        id="btn-redo"
                        color={'inherit'}
                        onClick={redo}
                        style={{ marginRight: '.5rem' }}
                        disabled={!redoable}
                    >
                        <Redo />
                    </Button>
                )}
                <Tooltip title={editing ? dict.topMenu.tooltipDisableEditing : dict.topMenu.tooltipEnableEditing}>
                    <Button id="btn-editing" color={'inherit'} onClick={toggleEditing} style={{ marginRight: '.5rem' }}>
                        {!editing ? <Lock /> : <LockOpen />}
                    </Button>
                </Tooltip>
                <Button id="btn-help" color={'inherit'} onClick={showManual} style={{ marginRight: '.5rem' }}>
                    <Help />
                </Button>
                <LanguageMenu />

                <Button
                    id="btn-tour"
                    color={'inherit'}
                    href={props.tour ? '/' : '/tour'}
                    variant={'outlined'}
                    style={{ marginLeft: '.5rem' }}
                >
                    {tour ? dict.topMenu.btnStopTour : dict.topMenu.btnStartTour}
                </Button>
            </Toolbar>
        </AppBar>
    );
}
