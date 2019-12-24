import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Authentication from './Authentication';
import * as Yup from 'yup';

export const apiUrl = 'api.pc4all.com';

// Funções para fazer o componente de autenticação retornar um callback sobre a chamada da api
const callbackOk = () => {
  action('status: 200');
  console.log('status: 200');
};

const signSchema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('A senha é obrigatória')
});

storiesOf('Authentication', module).add('view', () => <Authentication apiUrl={apiUrl} schema={signSchema} onSubmit={callbackOk} />);
