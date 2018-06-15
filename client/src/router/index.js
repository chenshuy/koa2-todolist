import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Index',
    redirect: '/list'
  }, {
    path: '/login',
    name: 'Login',
    component: resolve => require(['@/views/Login'], resolve)
  }, {
    path: '/list',
    name: 'List',
    component: resolve => require(['@/views/List'], resolve),
    meta: {
      requiresAuth: true
    }
  }, {
    path: '*',
    name: 'error',
    component: resolve => require(['@/views/404'], resolve)
  }
  ]
});

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 获取store里面的token
  const token = store.getters.token;
  // 判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

export default router;
