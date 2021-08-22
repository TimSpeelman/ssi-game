import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { NetworkPage } from './pages/NetworkPage';
import { TourPage } from './pages/TourPage';

export function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={'/'}>
                    <NetworkPage />
                </Route>

                <Route exact path={'/tour/:id'}>
                    {(p) => <TourPage tourId={p.match?.params.id} />}
                </Route>

                <Redirect from="/tour" to="/tour/full" />

                {/* Catch 404's */}
                <Redirect from="*" to="/" />
            </Switch>
        </BrowserRouter>
    );
}
