import '@babel/polyfill';
import 'ric';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import setupStore from './store';
import App from './component';
import './index.scss';

if (['production', 'development', 'staging'].indexOf(process.env.NODE_ENV) === -1) {
    throw new Error(`unknown env: ${process.env.NODE_ENV}`);
}

const store = setupStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
