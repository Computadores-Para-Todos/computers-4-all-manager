import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Layout from './Layout';

/**
 * Container da interface geral do sistema
 *
 * @returns {React} Página de layout renderizada
 */
function LayoutContainer({ user }) {
  const history = useHistory();
  const { email: userName } = user;

  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/authentication');
  };

  const sideMenuItens = [{ name: 'Início', icon: 'home', path: '/' }, { name: null }];
  const userMenuItens = [{ name: 'Perfil', icon: 'user', path: '/perfil' }];

  switch (user.role) {
    case 'admin':
      sideMenuItens.push({ name: 'Usuários', icon: 'users', path: '/users' });
      break;
    default:
  }

  return <Layout userName={userName} logoutCallback={handleLogout} sideMenuItens={sideMenuItens} userMenuItens={userMenuItens} />;
}

LayoutContainer.propTypes = {
  /** Objeto contendo os dados do usuário
   * (detalhes especificos do que será armazenado ainda não foi definido)
   **/
  user: PropTypes.object.isRequired
};

export default LayoutContainer;
