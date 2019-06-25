import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    {},
    composeWithDevTools(
      applyMiddleware(thunk, createLogger)
    )
  );
}