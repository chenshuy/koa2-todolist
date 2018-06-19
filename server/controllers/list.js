const db = require('../config/db');
const List = db.import('../models/list');

const Op = db.Op

module.exports = class listController {
  // 获取列表
  static async getList(ctx) {
    const list = await List.findAll({
      where: {
        user_id: ctx.user.id
      },
      attributes: ['id', 'content', 'status']
    })
    ctx.body = {
      s: 1,
      d: list
    }
  }

  // 创建列表
  static async createList(ctx) {
    const data = ctx.request.body;
    if (data) {
      await List.create({
        'user_id': ctx.user.id,
        'content': data.content,
        'status': data.status
      });
      ctx.body = {
        s: 1,
        m: '创建成功'
      }
    } else {
      ctx.body = {
        s: 0,
        m: '创建失败'
      }
    }
  }

  // 删除列表
  static async delList(ctx) {
    const { id } = ctx.request.body;
    // 判断 id 是否存在
    const isID = await List.findById(id);
    if (isID) {
      await List.destroy({
        where: {
          [Op.and]: [{id: id}, {user_id: ctx.user.id}]
        }
      });
      ctx.body = {
        s: 1,
        m: '删除成功'
      }
    } else {
      ctx.body = {
        s: 0,
        m: '删除失败'
      }
    }
  }

  // 更新列表
  static async updateList(ctx) {
    const { id, status } = ctx.request.body;
    // 判断 id 是否存在
    const isID = await List.findById(id);
    if (isID) {
      await List.update({
        'status': status
      }, {
        where: {
          [Op.and]: [{id: id}, {user_id: ctx.user.id}]
        }
      })
      ctx.body = {
        s: 1,
        m: '更新成功'
      }
    } else {
      ctx.body = {
        s: 0,
        m: '更新失败'
      }
    }
  }
}
