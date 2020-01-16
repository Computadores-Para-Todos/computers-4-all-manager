import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

/**
 * Rotas do dashboard
 *
 * @returns {React} O componente renderizado referente à rota atual
 */
function DashboardRoutes() {
  return (
    <Switch>
      <PrivateRoute path="/users" exact requires="admin" component={UserList} />
      <PrivateRoute path="/users/:id" requires="admin" component={UserForm} />
    </Switch>
  );
}

export default DashboardRoutes;
