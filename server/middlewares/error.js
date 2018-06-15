const jwt = require('jsonwebtoken');
const config = require('../config/config')

module.exports = async (ctx, next) => {
  const token = ctx.header.authorization;
  if(token) {
    try {
      let decoded = await jwt.verify(token.split(' ')[1], config.secret);
      ctx.user = {
        name: decoded.name,
        id: decoded.id
      }
    } catch(err) {
      console.log('token verify fail: ', err)
    }
  } else {
    ctx.body = {
      s: 0,
      m: 'token不存在'
    }
  }
  await next();
}
