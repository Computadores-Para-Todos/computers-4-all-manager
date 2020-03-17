import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import users from '../../../.storybook/mocks/users.json';

import UserForm from './UserForm';

const data = { name: '', document: '', gender: '', birthday: '', phone: '', email: '', role: '', status: '' };
const sampleData = users[0];

storiesOf('UserFrom', module)
  .add('default', () => <UserForm addingUser onSubmit={action('onSubmit')} data={data} />)
  .add('updating', () => <UserForm onSubmit={action('onSubmit')} data={sampleData} />)
  .add('loading', () => <UserForm loading onSubmit={action('onSubmit')} data={data} />)
  .add('error', () => <UserForm error="Falha ao submeter as alterações" onSubmit={action('onSubmit')} data={data} />);
