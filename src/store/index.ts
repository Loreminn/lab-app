import { applyMiddleware, compose, createStore } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';

// @ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
