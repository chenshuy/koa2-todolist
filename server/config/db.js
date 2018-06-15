const config = require('./config');
const Sequelize = require('sequelize');

// 数据库连接
const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  define: {
    timestamps: false
  }
})

module.exports = db

// sequelize-auto从数据库表自动生成Sequelize模型(Model)
// sequelize-auto -o "./models" -d todo -h localhost -u root -p 3306 -x 123456 -e mysql
