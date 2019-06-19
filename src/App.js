import React from 'react';

import { Switch, Route } from 'react-router-dom';
import AllProviders from './AllProviders';

import PoolListPage from './pages/PoolListPage';
import PoolPage from './pages/PoolPage';

const App = () => (
  <AllProviders>
    <Switch>
      <Route component={PoolPage} />
    </Switch>
  </AllProviders>
);

export default App;
