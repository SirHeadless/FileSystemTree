import * as React from 'react';
import { Route, Switch } from 'react-router';
import { hot } from 'react-hot-loader';
import {App2 as FileSystemTree} from 'app2/containers/App2'

export const App2 = hot(module)(() => (
  <Switch>
    <Route path="/" component={FileSystemTree} />
  </Switch>
));
