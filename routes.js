const express = require('express');
const routes = express.Router();
const products = require('./controllers/ProductsController');

routes.get('/', function (req, res) {
  return;
});

routes.get('/products/create', products.create);
routes.get('/products/:id', products.show);

routes.post('/products', products.post);

module.exports = routes;