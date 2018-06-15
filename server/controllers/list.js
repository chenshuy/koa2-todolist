const db = require('../config/db');
const List = db.import('../models/list');

module.exports = class listController {
  // 获取列表
  static async getList(ctx) {
    const list = await List.findAll({
      where: {
        user_id: ctx.user.id
      },
      attributes: ['content', 'status']
    })
    ctx.body = {
      s: 1,
      d: list
    }
  }

  static async createList(ctx) {

  }
}
