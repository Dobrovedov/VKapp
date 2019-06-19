import React from 'react';

// import Home from './panels/Home';
// import Error from './panels/Error';
// import QuePoll from './panels/QuePoll';

import { Switch, Route } from 'react-router-dom';
import AllProviders from './AllProviders';

import PoolListPage from './pages/PoolListPage';
import PoolPage from './pages/PoolPage';

const App = () => (
  <AllProviders>
    <Switch>
      <Route exact path="/" component={PoolListPage} />
      <Route component={PoolPage} />
    </Switch>
  </AllProviders>
);

export default App;
