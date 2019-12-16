import React from 'react';
import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/react';
import Autenticacao from './Autenticacao';

export const apiUrl = 'api.pc4all.com';

/* Funções para fazer o componente de autenticação retornar um callback sobre a chamada da api
const sucesso = status => {
  status ? action('status: 200') : action('status: 400');
};
const erro = status => {
  status ? action('status: 200') : action('status: 400');
};
*/

storiesOf('Autenticacao', module)
  .add('sucessoAPI', () => <Autenticacao apiUrl={apiUrl} sucesso={true} erro={false} />)
  .add('erroAPI', () => <Autenticacao apiUrl={apiUrl} sucesso={false} erro={true} />);
