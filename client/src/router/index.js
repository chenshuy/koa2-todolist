import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '登录页',
      component: Login
    }
  ]
});
