import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import UserList from './UserList';
import data from '../../../.storybook/mocks/users.json';

storiesOf('UserList', module)
  .add('default', () => <UserList data={data} onEdit={action('onEdit')} onDelete={action('onDelete')} />);
