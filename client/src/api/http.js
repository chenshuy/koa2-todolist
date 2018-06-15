import axios from 'axios';
import store from '../store/index';
import router from '../router/index';

// 生成实例
const http = axios.create();
http.defaults.timeout = 5000;

axios.interceptors.request.use = http.interceptors.request.use;

// request 拦截器
http.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      console.log(store.getters.token);
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    return config;
  },
  (error) => {
    console.log('error', error);
    Promise.reject(error);
  }
);
// response拦截器
http.interceptors.response.user(
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
    return Promise.reject(error.response);
  }
);

export default http;
