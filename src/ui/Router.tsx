import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ExamplesPage } from './pages/ExamplesPage';
import { LandingPage } from './pages/LandingPage';
import { NetworkPage } from './pages/NetworkPage';
import { TourPage } from './pages/TourPage';

export function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={'/'}>
                    <LandingPage />
                </Route>

                <Route exact path={'/app'}>
                    <NetworkPage />
                </Route>

                <Route exact path={'/examples'}>
                    <ExamplesPage />
                </Route>

                <Route exact path={'/tour/:id'}>
                    {(p) => <TourPage tourId={p.match?.params.id} />}
                </Route>

                <Redirect from="/tour" to="/tour/intro" />

                {/* Catch 404's */}
                <Redirect from="*" to="/" />
            </Switch>
        </BrowserRouter>
    );
}
