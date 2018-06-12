const jwt = require('jsonwebtoken');
const secret = require('../config/secret')

module.exports = (ctx, next) => {
  return next().catch((err) => {
    try {
      const token = ctx.header.token
      console.log(token)
      if(token) {
        jwt.verify(token, secret, function(err, decoded) {
          console.log(err)
          console.log(decoded)
        });
      }
    } catch (err) {
      if (err.status === 401) {
        ctx.body = {
          error: err.originalError ? err.originalError.message : err.message,
        };
      } else {
        throw err;
      }
    }
  });
}
