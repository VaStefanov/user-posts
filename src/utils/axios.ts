import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export default customFetch;
