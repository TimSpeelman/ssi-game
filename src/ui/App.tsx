import React, { useEffect, useRef } from 'react';
import { HotKeys } from 'react-hotkeys';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ActionCreators } from 'redux-undo';
import { loadFromLocalStorage } from '../persistence/localStorage';
import { ProjectActions, ScenarioActions } from '../state/scenario/actions';
import { UserManualDialogCtr } from './components/Manual/UserManualDialogCtr';
import { ProjectDrawer } from './components/ProjectDrawer';
import { SidebarTab } from './components/Sidebar/SidebarTab';
import { TopMenu } from './components/TopMenu';
import { GlobalDialogRouter } from './dialogs/GlobalDialogRouter';
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

    const dispatch = useDispatch();

    const hotKeysRef = useRef<HTMLElement>();

    useEffect(() => hotKeysRef && hotKeysRef.current && hotKeysRef.current.focus(), [hotKeysRef]);

    useEffect(() => {
        const savedState = loadFromLocalStorage('state');
        if (savedState) {
            dispatch(ScenarioActions.RESTORE_STATE({ state: savedState }));
        }
    }, []);

    return (
        <div className="fill">
            <HotKeys keyMap={keyMap} root={true} handlers={keyHandlers} className="fill" innerRef={hotKeysRef as any}>
                <UserManualDialogCtr />
                <GlobalDialogRouter />
                <ProjectDrawer />
                <TopMenu />
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
