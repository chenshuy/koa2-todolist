import axios from 'axios';

const $axios = axios.create();

$axios.interceptors.request.use((config) => {
  console.log(config);
  return config;
}, (error) => {
  console.log(error);
  Promise.reject(error);
});
