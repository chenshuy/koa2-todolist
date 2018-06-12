const Router = require('koa-router');
const userController = require('../controllers/user');
const listController = require('../controllers/list');

const router = new Router({
  prefix: '/api'
})

router
  .post('/login', userController.login) // 登录
  .post('/regist', userController.regist) // 注册
  .get('/userInfo', userController.userInfo) // 登录
  // .get('/getList', listController.getList) // 列表

module.exports = router
