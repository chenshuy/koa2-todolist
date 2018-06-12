import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import List from '@/views/List';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '登录页',
      component: Login
    },
    {
      path: '/list',
      name: '列表页',
      component: List
    }
  ]
});
