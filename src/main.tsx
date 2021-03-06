import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
// import { configureStore } from 'app/store  ';
// import { App } from './app';
import {App2} from "./app2/app2";
import { configureStore } from 'app2/store/store';

// prepare store
const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App2 />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
