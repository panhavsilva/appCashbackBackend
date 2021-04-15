import { Router } from 'express'
import products from '@/controllers/products-controller'
import cashbackRanges from '@/controllers/cashback-controller'
import orders from '@/controllers/orders-controller'
const routes = Router()

routes.get('/products', products.list)
routes.get('/products/:id/show', products.show)

routes.get('/cashback', cashbackRanges.list)

routes.get('/orders', orders.list)
routes.get('/orders/:id/show', orders.show)

routes.post('/products', products.create)
routes.put('/products/:id', products.edit)
routes.delete('/products/:id', products.delete)

routes.post('/cashback', cashbackRanges.create)
routes.put('/cashback/:id', cashbackRanges.edit)
routes.delete('/cashback/:id', cashbackRanges.delete)

routes.post('/orders', orders.create)
routes.put('/orders/:id', orders.edit)
routes.delete('/orders/:id', orders.delete)

export default routes
