import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

Vue.use(Router);

const layoutPage = [{
  path: '/list',
  name: 'list',
  component: resolve => require(['@/views/List'], resolve),
  meta: {
    requiresAuth: true
  }
}];

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/login',
    name: 'Login',
    component: resolve => require(['@/views/Login'], resolve)
  }, {
    path: '/regist',
    name: 'Regist',
    component: resolve => require(['@/views/Register'], resolve)
  }, {
    path: '',
    name: 'Layout',
    component: resolve => require(['@/views/layout/Layout'], resolve),
    redirect: 'list',
    children: layoutPage
  }, {
    path: '*',
    name: '404',
    component: resolve => require(['@/views/404'], resolve)
  }]
});

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (store.getters.token) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

export default router;
