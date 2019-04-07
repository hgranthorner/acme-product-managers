const express = require('express')
const path = require('path')
const app = express()
const { models: { User, Product } } = require('./db')
app.use(express.json())

app.use('/', express.static(path.join(__dirname,'..', 'client', 'dist')))

app.get('/api/users', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next)
})

app.get('/api/products', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next)
})

app.put('/api/products/:id', (req, res, next) => {
  const id = req.params.id
  const managerId = Number(req.body.managerId) || null
  console.log(id, managerId)
  Product.findByPk(id)
    .then( product => {
      product.managerId = managerId
      return product.save()
    })
    .then(product => {
      console.log('successfully updated\n', product.dataValues)
      res.sendStatus(204)
    })
    .catch(next)
})

module.exports = app