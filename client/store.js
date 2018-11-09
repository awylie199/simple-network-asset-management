import {createStore, applyMiddleware} from 'redux';
import reducer from './root-reducer';
import assetsMiddleware from './middleware/assets';
import {composeWithDevTools} from 'redux-devtools-extension';

export default function setupStore(initialState = {}) {
    let middleware = [
        assetsMiddleware,
    ];

    if (process.env.NODE_ENV !== 'production') {
        const createLogger = require('redux-logger').createLogger;

        middleware.push(createLogger());
    }

    if (typeof window !== 'undefined') {
        return createStore(reducer, initialState, composeWithDevTools(
            applyMiddleware(...middleware)
        ));
    } else {
        return createStore(reducer, initialState, applyMiddleware(...middleware));
    }
}
