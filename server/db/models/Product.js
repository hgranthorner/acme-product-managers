const db = require('../cnxn')

const Product = db.define('product',
  {
    name: db.Sequelize.TEXT
  })

module.exports = Product
