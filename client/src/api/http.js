import axios from 'axios';
import store from '../store';
import router from '../router';

// 生成实例
const instance = axios.create({
  baseURL: '/api/',
  timeout: 2500
});

instance.defaults.timeout = 5000;

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    return config;
  },
  (error) => {
    console.log('error', error);
    Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 清除token
      store.dispatch('UserLogout');
      // 跳转到登录页
      router.replace({
        path: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      });
    }
    Promise.reject(error.response);
  }
);

export default instance;
