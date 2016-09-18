import * as React from 'react';

const { IndexRoute, Route } = require('react-router');

import App from './app/containers/app';
import UsersPage from './users/containers/users-page';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ UsersPage } />
  </Route>
);
