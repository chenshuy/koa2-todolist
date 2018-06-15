const path = require('path')
const Koa = require('koa');
const static = require('koa-static');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const jwt = require('koa-jwt');

const router = require('./routes/index');
const err = require('./middlewares/error');
const config = require('./config/config');

const app = new Koa();

// 验证token
app.use(err)

// 配置ctx.body解析中间件
app.use(bodyparser())

// 配置控制台日志中间件
app.use(logger())

// JWT认证中间件
app.use(jwt({secret: config.secret}).unless({path: [/^\/api\/login/, /^\/api\/regist/]}))

// 配置静态资源加载中间件
app.use(static(
  path.join( __dirname, './static')
))

// 初始化路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 监听启动端口
app.listen(5000, () => {
  console.log('The server is running at http://localhost:5000/');
});
