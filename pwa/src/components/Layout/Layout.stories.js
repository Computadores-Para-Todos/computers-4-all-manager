import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';

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

export const DummyLayoutContainer = () => {
  const userName = 'Usuário';

  const sideMenuItens = [
    { name: 'Início', icon: 'home', path: '', exact: true, component: dummyPage('Início') },
    { name: 'Atividades', icon: 'list', path: 'atividades', component: dummyPage('Atividades') },
    { name: 'Doadores', icon: 'handshake', path: 'doadores', component: dummyPage('Doadores') },
    { name: 'Dispositivos', icon: 'desktop', path: 'dispositivos', component: dummyPage('Dispositivos') },
    { name: null, icon: null, path: '', component: null },
    { name: 'Usuários', icon: 'users', path: 'usuarios', component: dummyPage('Usuários') }
  ];

  const userMenuItens = [{ name: 'Perfil', icon: 'user', path: 'perfil', component: dummyPage('Perfil') }];

  return <Layout userName={userName} logoutCallback={action('Logout')} sideMenuItens={sideMenuItens} userMenuItens={userMenuItens} />;
};

storiesOf('Layout', module)
  .addDecorator(StoryRouter())
  .add('default', () => <DummyLayoutContainer />);
