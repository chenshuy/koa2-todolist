## vue+koa2的todolist

## 技术栈：
* vue
* koa2
* mysql

## 项目说明
新手练习项目，工作主要是前端，本着兴趣接触学习koa2。  
主要功能为登录，注册，对todolist增删改查等基础功能。  
koa2主要提供接口，页面渲染路由等都由vue来完成。  
数据库主要使用mysql。表有2张，用户表和list表。

## 项目运行
条件：  
node版本正确安装  
mysql服务有启动  

``` javascript
# 进入前端目录
cd client

# 安装依赖
npm install

# 本地开发环境 访问http://localhost:5050
npm run dev


# 后端 
cd server

# 安装依赖
npm install

npm start 或 node app.js
request http://localhost:5000
```

### 主要依赖模块：  
#### 后端
- mysql2
- sequelize： 基于node.js 的ORM（把数据库的数据映射为程序对象） 
- bcrypt：  密码的加密解密模块
- jsonwebtoken： token认证
- koa-logger： 日志
- koa-bodyparser：解析body的中间件
- koa-router：路由
- koa-static：静态目录


#### 前端
- axios，基于promise的异步请求。api/目录下封装了request请求拦截器和response拦截器，用来校验token。
- vue-router，注册全局钩子拦截导航
- vuex，状态管理，登录、退出，获取信息等操作。

### 接口
- 用户登录
- 用户注册
- 获取用户信息
- 获取列表
- 创建列表
- 删除列表
- 更新列表