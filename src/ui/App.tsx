import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Clear, Help, Menu, Redo, Restore, Undo } from '@material-ui/icons';
import React, { useEffect, useRef } from 'react';
import { HotKeys } from 'react-hotkeys';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ActionCreators } from 'redux-undo';
import { loadFromLocalStorage } from '../persistence/localStorage';
import { ProjectActions, ScenarioActions } from '../state/scenario/actions';
import {
    selectActiveProjectName,
    selectRedoable,
    selectScenarioDef,
    selectUndoable
} from '../state/scenario/selectors';
import { LanguageMenu } from './components/LanguageMenu';
import { UserManualDialogCtr } from './components/Manual/UserManualDialogCtr';
import { ProjectDrawer } from './components/ProjectDrawer';
import { SidebarTab } from './components/Sidebar/SidebarTab';
import { GlobalDialogRouter } from './dialogs/GlobalDialogRouter';
import { useLang } from './hooks/useLang';
import { NetworkCanvas } from './pages/NetworkCanvasPage';

const keyMap = {
    CLEAR_SELECTION: 'escape',

    UNDO: 'ctrl+z',
    REDO: ['ctrl+y', 'ctrl+shift+z'],

    PREV_STEP: ['left', 'up'],
    NEXT_STEP: ['right', 'down'],
    FIRST_STEP: ['ctrl+left', 'ctrl+up'],
    LAST_STEP: ['ctrl+right', 'ctrl+down'],
    GOTO_STEP: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],

    TAB_INFO: 'z',
    TAB_ACTORS: 'x',
    TAB_ASSETS: 'c',
    TAB_TIMELINE: 'v',
    TAB_STEP: 'b',
    TAB_SETTINGS: 'n',

    SHOW_MANUAL: 'h',
};

export function App() {
    const scenario = useSelector(selectScenarioDef);
    const undoable = useSelector(selectUndoable);
    const redoable = useSelector(selectRedoable);

    const keyHandlers = {
        CLEAR_SELECTION: () => dispatch(ProjectActions.CLEAR_SELECTION()),

        UNDO: () => dispatch(ActionCreators.undo()),
        REDO: () => dispatch(ActionCreators.redo()),

        FIRST_STEP: () => dispatch(ProjectActions.FIRST_STEP()),
        PREV_STEP: () => dispatch(ProjectActions.PREV_STEP()),
        NEXT_STEP: () => dispatch(ProjectActions.NEXT_STEP()),
        LAST_STEP: () => dispatch(ProjectActions.LAST_STEP()),
        GOTO_STEP: (e: any) => dispatch(ProjectActions.GOTO_STEP_INDEX({ index: parseInt(e.key, 10) })),
        TAB_INFO: () => dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.INFO })),
        TAB_ACTORS: () => dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ACTORS })),
        TAB_ASSETS: () => dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ASSETS })),
        TAB_TIMELINE: () => dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.TIMELINE })),
        TAB_STEP: () => dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.STEP })),
        TAB_SETTINGS: () => dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.SETTINGS })),

        SHOW_MANUAL: () => dispatch(ScenarioActions.SHOW_MANUAL()),
    };

    const { dict } = useLang();

    const dispatch = useDispatch();

    const undo = () => dispatch(ActionCreators.undo());

    const redo = () => dispatch(ActionCreators.redo());

    const clear = () => confirm(dict.app_msgConfirmClear) && dispatch(ProjectActions.CLEAR());

    const reset = () => confirm(dict.app_msgConfirmReset) && dispatch(ProjectActions.RESET());

    const showManual = () => dispatch(ScenarioActions.SHOW_MANUAL());

    const hotKeysRef = useRef<HTMLElement>();

    useEffect(() => hotKeysRef && hotKeysRef.current && hotKeysRef.current.focus(), [hotKeysRef]);

    // const { restore } = useLocalStorageSync({ key: 'scenario',  }

    useEffect(() => {
        const savedState = loadFromLocalStorage('state');
        if (savedState) {
            dispatch(ScenarioActions.RESTORE_STATE({ state: savedState }));
        }
    }, []);

    function openProjectDrawer() {
        dispatch(ScenarioActions.OPEN_PROJECT_DRAWER());
    }

    const projectName = useSelector(selectActiveProjectName);

    return (
        <div className="fill">
            <HotKeys keyMap={keyMap} root={true} handlers={keyHandlers} className="fill" innerRef={hotKeysRef as any}>
                <UserManualDialogCtr />
                <GlobalDialogRouter />
                <ProjectDrawer />
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" onClick={openProjectDrawer} color={'inherit'}>
                            <Menu />
                        </IconButton>
                        {/* <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
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
                        <Button color={'inherit'} onClick={clear} style={{ marginRight: '.5rem' }}>
                            <Clear /> {dict.btnClear}
                        </Button>
                        <Button color={'inherit'} onClick={reset} style={{ marginRight: '.5rem' }}>
                            <Restore /> {dict.btnReset}
                        </Button>
                        <Button color={'inherit'} onClick={showManual} style={{ marginRight: '.5rem' }}>
                            <Help />
                        </Button>

                        <LanguageMenu />
                    </Toolbar>
                </AppBar>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={'/netwerk'}>
                            <NetworkCanvas />
                        </Route>
                        {/* Default to Log Start Page */}
                        <Redirect exact from="/" to={'netwerk'} />

                        {/* Catch 404's */}
                        <Redirect from="*" to="/404" />
                    </Switch>
                </BrowserRouter>
            </HotKeys>
        </div>
    );
}
