import axios from 'axios';

if (!process.env.REACT_APP_API_URL) {
  console.error('Variavel de ambiente "REACT_APP_API_URL" não definida');
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export default api;
