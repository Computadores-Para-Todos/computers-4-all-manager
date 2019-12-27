import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import api from '../../services/api';

import Authentication from './Authentication';

const signSchema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('A senha é obrigatória')
});

/**
 * Container responsável pela autenticação do usuário e exibição do formulário
 * de autenticação caso o usuário não esteja logado no sistema.
 *
 * @returns {React} Layout do sistema caso logado ou formulário de autenticação,
 * caso o contrário
 */
function AuthenticationContainer() {
  const [error, setError] = useState(null);
  const history = useHistory();

  const saveUser = (token, user) => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        token,
        email: user.email,
        role: user.role,
        signed: true
      })
    );
    history.push('/');
  };

  const handleSubmit = async values => {
    const payload = {
      email: values.email,
      password: values.password
    };

    if (values.submit === 'login') {
      try {
        const response = await api.post('/users/login', payload);
        if (response.status === 200) {
          const { token, user } = response.data;
          saveUser(token, user);
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data.error);
        } else {
          setError('Falhas ao tentar se comunicar com o servidor.');
        }
      }
      return;
    }
    if (values.submit === 'signup') {
      try {
        const response = await api.post('/users/signup', payload);
        if (response.status === 200) {
          const { token, user } = response.data;
          saveUser(token, user);
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.statusText);
        } else {
          setError('Falhas ao tentar se comunicar com o servidor.');
        }
      }
      return;
    }
  };

  return <Authentication onSubmit={handleSubmit} schema={signSchema} errorMessage={error} />;
}

export default AuthenticationContainer;
