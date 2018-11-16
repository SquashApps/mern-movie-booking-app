import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from './reducers';
import config from '../config';

const configureStore = (initialState = {}, history) => {
  const sagaMiddleware = createSagaMiddleware();

  const finalCreateStore = compose(
    applyMiddleware(thunk, sagaMiddleware, routerMiddleware(history)),
    config.NODE_ENV !== 'production' &&
    typeof window !== 'undefined' &&
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(rootReducer, fromJS(initialState));

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
};

export default configureStore;
