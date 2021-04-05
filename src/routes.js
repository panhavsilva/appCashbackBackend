const express = require('express')
const routes = express.Router()
const products = getmodule('src/controllers/products-controller')
const cashbackRanges = getmodule('src/controllers/cashback-controller')

routes.get('/products', products.list)
routes.get('/products/:id/show', products.show)

routes.get('/cashback', cashbackRanges.list)

routes.post('/products', products.create)
routes.put('/products/:id', products.edit)
routes.delete('/products/:id', products.delete)

routes.post('/cashback', cashbackRanges.create)
routes.put('/cashback/:id', cashbackRanges.edit)
routes.delete('/cashback/:id', cashbackRanges.delete)

module.exports = routes
