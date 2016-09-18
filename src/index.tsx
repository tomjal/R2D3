import 'es5-shim';
import 'es6-shim';
import 'es6-promise';

// CSS
// import 'bootstrap/dist/css/bootstrap.css';

// React
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Redux
const { Provider } = require('react-redux');
import configureStore from './store/configure-store';

// Router
const { Router, browserHistory } = require('react-router');
const { syncHistoryWithStore } = require('react-router-redux');
import routes from './modules/routes';

// Translations
const { I18nextProvider } = require('react-i18next');
import i18n from './locales/i18n-client';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);
let ui18n = i18n.cloneInstance();

ReactDOM.render(
  <div>
    <I18nextProvider i18n={ ui18n }>
      <Provider store={ store }>
        <Router history={ history }>
          { routes }
        </Router>
      </Provider>
    </I18nextProvider>
  </div>,
  document.getElementById('root')
);
