import axios from 'axios';

// Cria uma instância do Axios com configurações padrão
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // URL base da API
  timeout: 10000, // Tempo limite para requisições
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
