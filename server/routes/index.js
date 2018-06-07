const Router = require('koa-router');
const userController = require('../controllers/user');

const router = new Router({
  prefix: '/api'
})

router
  .post('/login', userController.login) //登录
  .post('/regist', userController.regist) //注册

module.exports = router
