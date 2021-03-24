const express = require('express');
const routes = express.Router();
const products = require('./controllers/ProductsController');

routes.get('/products', products.list);
routes.get('/products/:id/show', products.show);

routes.post('/products', products.post);
routes.put('/products/:id', products.put);
routes.delete('/products/:id', products.delete);

module.exports = routes;