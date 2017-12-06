// store.js

import { createStore, combineReducers, applyMiddleware} from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as reducers from './reducers';

export const history = createHistory();
let middleware = [thunk, routerMiddleware(history), logger];
const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    applyMiddleware(...middleware)
)

export default store;
