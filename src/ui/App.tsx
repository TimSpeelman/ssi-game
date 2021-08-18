import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { loadFromLocalStorage } from '../persistence/localStorage';
import { GameActions } from '../state/actions';
import { HighlightCover } from './components/HighlightCover';
import { HotKeysContainer } from './components/HotKeysContainer';
import { UserManualDialogCtr } from './components/Manual/UserManualDialogCtr';
import { ProjectDrawer } from './components/menus/ProjectDrawer';
import { TopMenu } from './components/menus/TopMenu';
import { GlobalDialogRouter } from './dialogs/GlobalDialogRouter';
import { useHighlightsContext } from './HighlightsContext';
import { NetworkCanvas } from './pages/NetworkCanvasPage';

const lights = ['btn-project-drawer', 'btn-undo', 'btn-redo', 'btn-help', 'btn-lang'];

export function App() {
    const dispatch = useDispatch();
    const highlights = useHighlightsContext();

    useEffect(() => {
        const savedState = loadFromLocalStorage('state');
        if (savedState) {
            dispatch(GameActions.RESTORE_STATE({ state: savedState }));
        }

        lights.forEach((l, i) => setTimeout(() => highlights.highlight(l), (i + 1) * 1000));
    }, []);

    return (
        <div className="fill">
            <HighlightCover on={!!highlights.highlightedRect} highlight={highlights.highlightedRect} />
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
