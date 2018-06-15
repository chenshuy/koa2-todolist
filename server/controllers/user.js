const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const User = db.import('../models/user');

const config = require('../config/config');

module.exports = class userController {
  // 登录
  static async login(ctx) {
    // 初始化
    const msg = {};
    msg.s = 0;
    // 接收信息
    const data = ctx.request.body;
    // 匹配帐号
    const user = await User.findOne({
      where: {
        user_name: data.username
      }
    })
    if (!user) {
      msg.m = '用户名不存在';
    } else {
      // 匹配密码
      const isEqual = await bcrypt.compare(data.password, user.password);
      // 生成token 返回客户端
      if (isEqual) {
        msg.s = 1;
        msg.m = 'ok';
        const userToken = {
          name: user.user_name,
          id: user.id
        }
        msg.token = jwt.sign(userToken, config.secret, { expiresIn: '12h' });
      } else {
        msg.m = '密码错误';
      }
    }
    ctx.body = msg
  }

  // 注册
  static async regist(ctx) {
    const msg = {};
    msg.s = 0;
    const data = ctx.request.body;
    const user = await User.findOne({
      where: {
        user_name: data.username
      }
    })
    if (user) {
      msg.m = '用户名已存在';
    } else {
      // 加密
      data.password = await bcrypt.hash(data.password, 5)
      // 创建
      await User.create({
        user_name: data.username,
        password: data.password
      })
      msg.s = 1;
      msg.m = 'ok';
    }
    ctx.body = msg
  }

  // 用户信息
  static async userInfo(ctx) {
    // 初始化
    const msg = {};
    msg.s = 0;
    const user = ctx.user
    if(user) {
      msg.s = 1;
      msg.m = 'ok';
      msg.d = user.name;
    }
    ctx.body = msg;
  }
}
