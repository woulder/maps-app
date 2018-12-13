import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import reducer from 'reducer';

export default function configureStore({ history }) {
  const
    middleWares = [
      thunkMiddleware,
      routerMiddleware(history)
    ],
    enhancers = [
      applyMiddleware(...middleWares)
    ],
    composeEnhancers =
      typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(reducer, {}, composeEnhancers(...enhancers));
}