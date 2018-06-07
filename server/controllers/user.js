const db = require('../config/db');
const User = db.import('../models/user.js');

class userController {
  // 登录
  static async login (ctx, next) {
    const data = ctx.request.body;
    const user = await User.findOne({
      where: {
        user_name: data.username
      }
    })
    console.log(user)
    // const all = await User.findAll()
    // ctx.body = all
  }

  // 注册
  static async regist (ctx, next) {

  }
}
module.exports = userController
