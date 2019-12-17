import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Autenticacao from './Autenticacao';

export const apiUrl = 'api.pc4all.com';

// Funções para fazer o componente de autenticação retornar um callback sobre a chamada da api
const callbackOk = () => {
  action('status: 200');
  console.log('status: 200');
};
const callbackNotOk = () => {
  action('status: 400');
  console.log('status: 400');
};

storiesOf('Autenticacao', module).add('view', () => <Autenticacao apiUrl={apiUrl} callbackOk={callbackOk} callbackNotOk={callbackNotOk} />);
