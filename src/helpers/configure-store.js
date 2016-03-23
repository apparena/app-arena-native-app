import createLogger from 'redux-logger';
import promise from 'redux-promise';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';

const middleware = [];

middleware.push(promise);
middleware.push(thunk);

export default function configureStore(initialState) {
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
        middleware.push(createLogger({collapsed:true}));
    }
    const enhancer = compose(
        applyMiddleware(...middleware)
    );

    const store = createStore(
        reducer,
        initialState,
        enhancer
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}