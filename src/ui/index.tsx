import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import './assets/css/1-reset.css';
import './assets/css/3-custom.css';
import { DialogContextProvider } from './dialogs/DialogContext';
import { HighlightsContextProvider } from './HighlightsContext';
import * as serviceWorker from './serviceWorker';
import { store } from './store';

/**
 * If our app crashes due to corrupt or outdated local storage, offer a reset
 * (for development purposes only, of course)
 */
function checkReset() {
    if (window.location.href.indexOf('reset') >= 0) {
        localStorage.clear();
        window.location.assign('/');
    }
}

window.addEventListener('hashchange', checkReset);
checkReset();

export async function mount(rootElement: HTMLElement) {
    const root = (
        <Provider store={store}>
            <SnackbarProvider maxSnack={10}>
                <DialogContextProvider>
                    <HighlightsContextProvider>
                        <App />
                    </HighlightsContextProvider>
                </DialogContextProvider>
            </SnackbarProvider>
        </Provider>
    );

    ReactDOM.render(root, rootElement);

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
}
