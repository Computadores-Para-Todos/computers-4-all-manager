import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';

import Authentication from './Authentication';
import Layout from '../Layout';

const signSchema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('A senha é obrigatória')
});

/**
 *
 */
function AuthenticationContainer({ apiUrl }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const saveUser = (token, user) => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        token,
        user
      })
    );
    setUser({ token, user });
    setError(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleSubmit = async values => {
    const payload = {
      email: values.email,
      password: values.password
    };

    if (values.submit === 'login') {
      try {
        const response = await axios.post(`${apiUrl}/users/login`, payload);
        console.log(response);
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
        const response = await axios.post(`${apiUrl}/users/signup`, payload);
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

  return user ? (
    <Layout user={user} logoutCallback={handleLogout} />
  ) : (
    <Authentication onSubmit={handleSubmit} schema={signSchema} errorMessage={error} />
  );
}

export default AuthenticationContainer;
