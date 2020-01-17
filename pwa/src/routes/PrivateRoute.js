import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Rota privada que exige que o usuário esteja logado para exibir o conteudo
 *
 * @returns {React} O componente passado pela prop 'component' renderizado
 */
function PrivateRoute({ component: Component, requires, ...rest }) {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user || !user.signed) {
    return <Redirect to="/authentication" />;
  }

  if (requires && requires !== user.role && requires.isArray() && !requires.find(user.role)) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} render={props => <Component user={user} {...props} />} />;
}

PrivateRoute.propTypes = {
  /** Componente a ser renderizado */
  component: PropTypes.func.isRequired,
  /** Roles que podem acessar a rota (qualquer role pode ser acessado caso não seja informado) */
  requires: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};

PrivateRoute.defaultProps = {
  roles: null
};

export default PrivateRoute;
