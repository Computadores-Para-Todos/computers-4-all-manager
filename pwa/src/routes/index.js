import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Authentication from '../components/Authentication';
import Layout from '../components/Layout';

/**
 * Rotas do sistema
 *
 * @returns {React} O componente renderizado referente à rota atual
 */
function Routes() {
  return (
    <Switch>
      <Route path="/authentication" component={Authentication} />
      <PrivateRoute path="/" component={Layout} />
    </Switch>
  );
}

export default Routes;
