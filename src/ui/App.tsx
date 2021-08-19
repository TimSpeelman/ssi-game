import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { loadFromLocalStorage } from '../persistence/localStorage';
import { GameActions } from '../state/actions';
import { HighlightCover } from './components/HighlightCover';
import { HotKeysContainer } from './components/HotKeysContainer';
import { UserManualDialogCtr } from './components/Manual/UserManualDialogCtr';
import { ProjectDrawer } from './components/menus/ProjectDrawer';
import { TopMenu } from './components/menus/TopMenu';
import { TourMessage } from './components/TourMessage';
import { GlobalDialogRouter } from './dialogs/GlobalDialogRouter';
import { useChildMeasurements } from './hooks/useHighlights';
import { NetworkCanvas } from './pages/NetworkCanvasPage';
import { FullTour } from './tour/FullTour';
import { useTour } from './tour/useTour';

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
    const tour = useTour(FullTour);

    // const [hl, setHL] = useState<{ q: string; expand?: number } | undefined>(undefined);

    useEffect(() => {
        const savedState = loadFromLocalStorage('state');
        if (savedState) {
            dispatch(GameActions.RESTORE_STATE({ state: savedState }));
        }

        tour.next(); // start
    }, []);

    const ref = useRef(null);
    const childRect = useChildMeasurements(ref, tour.step?.highlight?.q);

    return (
        <div className="fill" ref={ref}>
            <HotKeysContainer autoFocus>
                {tour.step && (
                    <TourMessage
                        index={tour.index}
                        step={tour.step}
                        numberOfSteps={tour.numberOfSteps}
                        onNext={tour.next}
                        onPrev={tour.prev}
                        onClose={tour.close}
                    />
                )}
                <HighlightCover on={!!childRect} rect={childRect} expand={tour.step?.highlight?.expand} />
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
