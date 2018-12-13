import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import configureStore from 'store';
import Page from 'components/Page';

const history = createHistory();
const store = configureStore({ history });

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Page />
    </ConnectedRouter>
  </Provider>
);

export default App;