const Router = require('koa-router');
const userController = require('../controllers/user');
const listController = require('../controllers/list');

const router = new Router({
  prefix: '/api'
})

router
  .post('/regist', userController.regist) // 注册
  .post('/login', userController.login) // 登录
  .get('/userInfo', userController.userInfo) // 获取用户信息
  .get('/getList', listController.getList) // 获取列表
  .post('/createList', listController.createList) // 创建列表
  .post('/delList', listController.delList) // 删除列表
  .post('/updateList', listController.updateList) // 更新列表状态

module.exports = router
