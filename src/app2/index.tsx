import * as React from 'react';
import { Route, Switch } from 'react-router';
import { hot } from 'react-hot-loader';
import MainPage  from 'app2/containers/App2'


// Here I can add an other path to a login component
export const App2 = hot(module)(() => (
  <Switch>
    <Route path="/" component={MainPage} />
  </Switch>
));
