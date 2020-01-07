import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Rota privada que exige que o usuário esteja logado para exibir o conteudo
 *
 * @returns {React} O componente passado pela prop 'component' renderizado
 */
function PrivateRoute({ component: Component, ...rest }) {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user || !user.signed) {
    return <Redirect to="/authentication" />;
  }

  return <Route {...rest} render={props => <Component user={user} {...props} />} />;
}

PrivateRoute.propTypes = {
  /** Componente a ser renderizado */
  component: PropTypes.func.isRequired
};

export default PrivateRoute;
