import React, { useEffect, useRef, useState } from 'react';
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
import { useChildMeasurements } from './hooks/useHighlights';
import { NetworkCanvas } from './pages/NetworkCanvasPage';

const lights = [
    { q: '#btn-project-drawer', expand: 0 },
    { q: '#project-title', expand: 0 },
    { q: '#btn-undo', expand: 0 },
    { q: '#btn-redo', expand: 0 },
    { q: '#btn-help', expand: 0 },
    { q: '#btn-lang', expand: 0 },
    { q: '#sidebar', expand: 0 },
    { q: '#sidebar-main', expand: 0 },
    { q: '#sidebar-menu', expand: 0 },
    { q: '#time-control', expand: 1 },
    { q: '.canvasarea', expand: -1 },
];

export function App() {
    const dispatch = useDispatch();
    const [hl, setHL] = useState<{ q: string; expand?: number } | undefined>(undefined);

    useEffect(() => {
        const savedState = loadFromLocalStorage('state');
        if (savedState) {
            dispatch(GameActions.RESTORE_STATE({ state: savedState }));
        }

        lights.forEach((l, i) => setTimeout(() => setHL(l), (i + 1) * 1000));
    }, []);

    const ref = useRef(null);
    const childRect = useChildMeasurements(ref, hl?.q);

    return (
        <div className="fill" ref={ref}>
            <HighlightCover on={!!hl} rect={childRect} expand={hl?.expand} />
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
