import { combineReducers } from 'redux';

const { routerReducer } = require('react-router-redux');
const formReducer = require('redux-form').reducer;

import users from './users/reducers/users';
import session from './app/reducers/session';

const rootReducer = combineReducers({
  session,
  users,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
