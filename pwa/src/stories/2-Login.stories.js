import React from 'react';
import { action } from '@storybook/addon-actions';
export default {
  title: 'Autenticacao'
};

export const view = () => <input onChange={action('você está editando o input')}></input>;
