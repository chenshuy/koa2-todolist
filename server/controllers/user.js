const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const db = require('../config/db');
const User = db.import('../models/user.js');

class userController {
  // 登录
  static async login(ctx) {
    const msg = {};
    const data = ctx.request.body;
    const user = await User.findOne({
      where: {
        user_name: data.username
      }
    })
    if (!user) {
      msg.message = '用户名不存在';
    } else {
      // 匹配密码
      const isEqual = await bcrypt.compare(data.password, user.password)
      if (isEqual) {
        msg.message = '登录成功';
      } else {
        msg.message = '密码错误';
      }
    }
    ctx.body = msg
  }

  // 注册
  static async regist(ctx) {
    const msg = {}
    const data = ctx.request.body;
    const user = await User.findOne({
      where: {
        user_name: data.username
      }
    })
    if (user) {
      msg.message = '用户名已存在';
    } else {
      // 加密
      data.password = await bcrypt.hash(data.password, 5)
      // 创建
      await User.create({
        user_name: data.username,
        password: data.password
      })
      msg.message = '注册成功';
    }
    ctx.body = msg
  }
}
module.exports = userController
