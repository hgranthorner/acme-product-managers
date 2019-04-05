const db = require('../cnxn')

const User = db.define('user',
  {
    name: db.Sequelize.TEXT
  })

module.exports = User