import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './assets/css/1-reset.css';
import './assets/css/3-custom.css';
import * as serviceWorker from './serviceWorker';
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
    const root = <App />;

    ReactDOM.render(root, rootElement);

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
}
