import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/1-reset.css';
import './assets/css/3-custom.css';
import * as serviceWorker from './serviceWorker';

export async function mount(rootElement: HTMLElement) {
    const root = <div>Hello</div>;

    ReactDOM.render(root, rootElement);

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
}
