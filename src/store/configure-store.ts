///<reference path="./dev-types.d.ts"/>

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
const thunk = require('redux-thunk').default;
const persistState = require('redux-localstorage');

import promiseMiddleware from '../middleware/promise';
import logger from '../middleware/logger';

import rootReducer from '../modules/reducers';


function configureStore(initialState) {
  // const store = compose(
  //  _getMiddleware(),
  //  ..._getEnhancers()
  // )(createStore)(rootReducer, initialState);

  let middleware = [
    promiseMiddleware,
    thunk,
  ];
  if (__DEV__) {
    middleware = [...middleware, logger];
  }

  let enhancers = [
    persistState('session', _getStorageConfig()),
  ];
  if (__DEV__ && window.devToolsExtension) {
    enhancers = [...enhancers, window.devToolsExtension()];
  }

  const store = createStore(
    rootReducer,
    enhancers,
    compose(
      applyMiddleware(...middleware)
    )
  );

  _enableHotLoader(store);
  return store;
}

function _enableHotLoader(store) {
  if (__DEV__ && module.hot) {
    module.hot.accept('../modules/reducers', () => {
      const nextRootReducer = require('../modules/reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
}

function _getStorageConfig() {
  return {
    key: 'react-redux-seed',
    serialize: (store) => {
      return store && store.session ?
        JSON.stringify(store.session.toJS()) : store;
    },
    deserialize: (state) => ({
      session: state ? fromJS(JSON.parse(state)) : fromJS({}),
    }),
  };
}

export default configureStore;
