import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { NetworkPage } from './pages/NetworkPage';
import { TourPage } from './pages/TourPage';

export function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={'/'}>
                    <NetworkPage />
                </Route>

                <Route exact path={'/tour'}>
                    <TourPage />
                </Route>

                {/* Catch 404's */}
                <Redirect from="*" to="/" />
            </Switch>
        </BrowserRouter>
    );
}
