import React from 'react';
import PropTypes from 'prop-types';

import Layout from './Layout';

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
function LayoutContainer({ user, logoutCallback }) {
  const userName = user.email;

  const sideMenuItens = [
    { name: 'Início', icon: 'home', path: '', exact: true, component: dummyPage('Início') },
    { name: 'Atividades', icon: 'list', path: 'atividades', component: dummyPage('Atividades') },
    { name: 'Doadores', icon: 'handshake', path: 'doadores', component: dummyPage('Doadores') },
    { name: 'Dispositivos', icon: 'desktop', path: 'dispositivos', component: dummyPage('Dispositivos') },
    { name: null, icon: null, path: '', component: null },
    { name: 'Usuários', icon: 'users', path: 'usuarios', component: dummyPage('Usuários') }
  ];

  const userMenuItens = [{ name: 'Perfil', icon: 'user', path: 'perfil', component: dummyPage('Perfil') }];

  return <Layout userName={userName} logoutCallback={logoutCallback} sideMenuItens={sideMenuItens} userMenuItens={userMenuItens} />;
}

LayoutContainer.propTypes = {
  /** Objeto contendo os dados do usuário
   * (detalhes especificos do que será armazenado ainda não foi definido)
   **/
  user: PropTypes.object.isRequired,
  /** Função que será chamada ao apertar o botão de logout */
  logoutCallback: PropTypes.func.isRequired
};

export default LayoutContainer;
