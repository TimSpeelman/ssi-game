import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import './assets/css/1-reset.css';
import './assets/css/3-custom.css';
import { DialogContextProvider } from './dialogs/DialogContext';
import { Router } from './Router';
import { store } from './store';

export function App() {
    return (
        <Provider store={store}>
            <SnackbarProvider maxSnack={10}>
                <DialogContextProvider>
                    <Router />
                </DialogContextProvider>
            </SnackbarProvider>
        </Provider>
    );
}
