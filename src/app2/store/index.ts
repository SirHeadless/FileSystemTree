import {applyMiddleware, createStore, Store} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {routerMiddleware} from "react-router-redux";
import {History} from "history";
import {rootReducer, RootState} from "app2/reducers";
import {logger} from "app2/middleware";
import { createLogger } from 'redux-logger';

export function configureStore(history: History, initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(logger, createLogger(), routerMiddleware(history));

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<RootState>;

  // This is for hot reload!?
  if (module.hot) {
    module.hot.accept('app2/reducers', () => {
      const nextReducer = require('app2/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
