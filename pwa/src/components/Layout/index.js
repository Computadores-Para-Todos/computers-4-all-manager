import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Layout from './Layout';
import UserList from '../UserList';

const dummyPage = title => {
  const DummyPage = () => (
    <>
      <h1>{title}</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus bibendum porta. Aliquam vehicula scelerisque orci, id
        vestibulum erat accumsan quis. Donec vel aliquam lorem. Aliquam sollicitudin eros justo, ac vestibulum leo posuere at. Aliquam
        ullamcorper consectetur eros, ac ultrices magna laoreet ac. Curabitur bibendum ultricies arcu eget tristique. Suspendisse sit amet
        lorem sem. Phasellus sed felis ante. Morbi cursus nisi non accumsan fringilla. Nullam eleifend non est a ultrices. Quisque nec
        dapibus erat. Curabitur porttitor enim elit, quis tincidunt quam facilisis et. Aliquam ac ipsum nec dolor egestas mollis at vitae
        nisi. Sed eleifend dolor lacus, nec pretium mi maximus ut. Pellentesque turpis nisi, ullamcorper eu nulla at, efficitur consequat
        mauris. Sed eu neque nec tellus volutpat cursus.
      </p>
    </>
  );
  return DummyPage;
};

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

  const sideMenuItens = [{ name: 'Início', icon: 'home', path: '/', exact: true, component: dummyPage('Início') }, { name: null }];
  const userMenuItens = [{ name: 'Perfil', icon: 'user', path: '/perfil', component: dummyPage('Perfil') }];

  switch (user.role) {
    case 'admin':
      sideMenuItens.push({ name: 'Usuários', icon: 'users', path: '/users', exact: true, component: UserList });
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
