import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Layout from './Layout';

const userName = 'Usuário';
const activePage = 'Início';
const dummyPage = () => (
  <>
    <h1>Content Here</h1>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus bibendum porta. Aliquam vehicula scelerisque orci, id
      vestibulum erat accumsan quis. Donec vel aliquam lorem. Aliquam sollicitudin eros justo, ac vestibulum leo posuere at. Aliquam
      ullamcorper consectetur eros, ac ultrices magna laoreet ac. Curabitur bibendum ultricies arcu eget tristique. Suspendisse sit amet
      lorem sem. Phasellus sed felis ante. Morbi cursus nisi non accumsan fringilla. Nullam eleifend non est a ultrices. Quisque nec dapibus
      erat. Curabitur porttitor enim elit, quis tincidunt quam facilisis et. Aliquam ac ipsum nec dolor egestas mollis at vitae nisi. Sed
      eleifend dolor lacus, nec pretium mi maximus ut. Pellentesque turpis nisi, ullamcorper eu nulla at, efficitur consequat mauris. Sed eu
      neque nec tellus volutpat cursus.
    </p>
  </>
);

storiesOf('Layout', module).add('default', () => (
  <Layout
    render={dummyPage}
    activePage={activePage}
    userName={userName}
    selectPageCallback={action('Select Page')}
    logoutCallback={action('Logout')}
  />
));
