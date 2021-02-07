const Sequelize = require('sequelize')
const TaskModel = require('./model/task')
require('dotenv').config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: process.env.NODE_ENV === 'production' ? '' : console.log,
  },
)

var db = {}

db.Task = TaskModel(sequelize, Sequelize)

Object.keys(db).forEach(function (modelName) {
  if ('classMethods' in db[modelName].options) {
    if ('associate' in db[modelName].options['classMethods']) {
      db[modelName].options.classMethods.associate(db)
    }
  }
})

sequelize
  .sync({ force: false, alter: false })
  .then(async () => {
      console.log('Database & tables created!')
  })

module.exports.db = db
module.exports.sequelize = sequelize