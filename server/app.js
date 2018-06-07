const path = require('path')
const Koa = require('koa');
const static = require('koa-static');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const Sequelize = require('sequelize');

const router = require('./routes/index')

const app = new Koa();

// 配置控制台日志中间件
app.use(logger())

// 配置ctx.body解析中间件
app.use(bodyparser())

// 配置静态资源加载中间件
app.use(static(
  path.join( __dirname, './static')
))

// 初始化路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 监听启动端口
app.listen(5000, () => {
  console.log('app started at port 5000...');
});
