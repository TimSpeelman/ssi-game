import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Clear, Redo, Restore, RestorePage, Save, Undo } from '@material-ui/icons';
import React, { useEffect, useRef } from 'react';
import { HotKeys } from 'react-hotkeys';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ActionCreators } from 'redux-undo';
import { loadScenarioFromFile } from '../persistence/loadScenarioFromFile';
import { loadScenarioFromLocalStorage } from '../persistence/loadScenarioFromLocalStorage';
import { saveScenarioToFile } from '../persistence/saveScenarioToFile';
import { saveScenarioToLocalStorage } from '../persistence/saveScenarioToLocalStorage';
import { ScenarioActions } from '../state/scenario/actions';
import { selectRedoable, selectScenarioDef, selectUndoable } from '../state/scenario/selectors';
import { LanguageMenu } from './components/LanguageMenu';
import { SidebarTab } from './components/Sidebar/SidebarTab';
import { useDialogService } from './dialogs/DialogContext';
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
};

export function App() {
    const scenario = useSelector(selectScenarioDef);
    const undoable = useSelector(selectUndoable);
    const redoable = useSelector(selectRedoable);

    const keyHandlers = {
        CLEAR_SELECTION: () => dispatch(ScenarioActions.CLEAR_SELECTION()),

        UNDO: () => dispatch(ActionCreators.undo()),
        REDO: () => dispatch(ActionCreators.redo()),

        FIRST_STEP: () => dispatch(ScenarioActions.FIRST_STEP()),
        PREV_STEP: () => dispatch(ScenarioActions.PREV_STEP()),
        NEXT_STEP: () => dispatch(ScenarioActions.NEXT_STEP()),
        LAST_STEP: () => dispatch(ScenarioActions.LAST_STEP()),
        GOTO_STEP: (e: any) => dispatch(ScenarioActions.GOTO_STEP_INDEX({ index: parseInt(e.key, 10) })),
        TAB_INFO: () => dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.INFO })),
        TAB_ACTORS: () => dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ACTORS })),
        TAB_ASSETS: () => dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ASSETS })),
        TAB_TIMELINE: () => dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.TIMELINE })),
        TAB_STEP: () => dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.STEP })),
        TAB_SETTINGS: () => dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.SETTINGS })),
    };

    const { dict } = useLang();

    const dispatch = useDispatch();

    const undo = () => dispatch(ActionCreators.undo());

    const redo = () => dispatch(ActionCreators.redo());

    const clear = () => confirm(dict.app_msgConfirmClear) && dispatch(ScenarioActions.CLEAR());

    const reset = () => confirm(dict.app_msgConfirmReset) && dispatch(ScenarioActions.RESET());

    const saveToFile = () => saveScenarioToFile(scenario);

    const hotKeysRef = useRef<HTMLElement>();

    useEffect(() => hotKeysRef && hotKeysRef.current && hotKeysRef.current.focus(), [hotKeysRef]);

    function loadFromFile(e: any) {
        const files = e.target.files;
        console.log('FILES', files);
        if (!files || files.length !== 1) return;

        loadScenarioFromFile(files[0])
            .then((scenario) => {
                dispatch(ScenarioActions.SET_SCENARIO({ scenario }));
                alert(dict.app_msgFileLoaded);
            })
            .catch((e) => alert(e));
    }

    useEffect(() => {
        const restored = loadScenarioFromLocalStorage();
        if (restored) {
            dispatch(ScenarioActions.SET_SCENARIO({ scenario: restored }));
        } else {
            dispatch(ScenarioActions.RESET());
        }
    }, []);

    useEffect(() => {
        saveScenarioToLocalStorage(scenario);
    }, [scenario]);

    const dialogCtx = useDialogService();

    return (
        <div className="fill">
            <HotKeys keyMap={keyMap} root={true} handlers={keyHandlers} className="fill" innerRef={hotKeysRef as any}>
                <GlobalDialogRouter />
                <AppBar position="static">
                    <Toolbar>
                        {/* <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            Identity Game
                        </Typography>
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
                        <Button color={'inherit'} onClick={saveToFile} style={{ marginRight: '.5rem' }}>
                            <Save /> {dict.btnSaveToFile}
                        </Button>
                        <Button color={'inherit'} component={'label'}>
                            <RestorePage /> {dict.btnLoadFromFile}
                            <input type="file" hidden value={undefined} onChange={(e) => loadFromFile(e)} />
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
