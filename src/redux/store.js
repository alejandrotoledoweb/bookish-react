import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducer from './reducers/reducer';

const initialState = {};
const middlewares = [thunk];

const composeWithDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(reducer, initialState, composedEnhancers);

export default store;
