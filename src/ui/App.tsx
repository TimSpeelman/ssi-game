import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { loadFromLocalStorage } from '../persistence/localStorage';
import { GameActions } from '../state/scenario/actions';
import { HotKeysContainer } from './components/HotKeysContainer';
import { UserManualDialogCtr } from './components/Manual/UserManualDialogCtr';
import { ProjectDrawer } from './components/menus/ProjectDrawer';
import { TopMenu } from './components/menus/TopMenu';
import { GlobalDialogRouter } from './dialogs/GlobalDialogRouter';
import { NetworkCanvas } from './pages/NetworkCanvasPage';

export function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const savedState = loadFromLocalStorage('state');
        if (savedState) {
            dispatch(GameActions.RESTORE_STATE({ state: savedState }));
        }
    }, []);

    return (
        <div className="fill">
            <HotKeysContainer autoFocus>
                <UserManualDialogCtr />

                <GlobalDialogRouter />

                <ProjectDrawer />

                <TopMenu />

                <BrowserRouter>
                    <Switch>
                        <Route exact path={'/'}>
                            <NetworkCanvas />
                        </Route>

                        {/* Catch 404's */}
                        <Redirect from="*" to="/" />
                    </Switch>
                </BrowserRouter>
            </HotKeysContainer>
        </div>
    );
}
