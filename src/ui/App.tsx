import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { loadFromLocalStorage } from '../persistence/localStorage';
import { ScenarioActions } from '../state/scenario/actions';
import { HotKeysContainer } from './components/HotKeysContainer';
import { UserManualDialogCtr } from './components/Manual/UserManualDialogCtr';
import { ProjectDrawer } from './components/ProjectDrawer';
import { TopMenu } from './components/TopMenu';
import { GlobalDialogRouter } from './dialogs/GlobalDialogRouter';
import { NetworkCanvas } from './pages/NetworkCanvasPage';

export function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const savedState = loadFromLocalStorage('state');
        if (savedState) {
            dispatch(ScenarioActions.RESTORE_STATE({ state: savedState }));
        }
    }, []);

    return (
        <div className="fill">
            <HotKeysContainer>
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
            </HotKeysContainer>
        </div>
    );
}
