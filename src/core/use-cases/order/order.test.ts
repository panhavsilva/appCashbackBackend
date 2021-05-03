import { right, left } from 'fp-ts/Either'
import { Order } from '@/core/types/order'
import { createOrder, SaveOrder } from './create-order'

const order: Order = {
  order_value: 100,
  product_list: [
    { name: 'product1', price: 100, quantity: 10 },
    { name: 'product2', price: 200, quantity: 1 },
  ],
}
const order2: Order = {
  order_value: 100,
  product_list: [],
}
const hasProduct = (order: Order): Boolean => {
  return order.product_list.length !== 0
}
const orderValid = (order: Order): Boolean => {
  const orderItems = [hasProduct(order)]
  return orderItems.every((item) => item === true)
}
const saveOrder: SaveOrder = async (order) => {
  return orderValid(order) ? order : saveOrderError()
}
const saveOrderError = async (): Promise<never> => {
  throw new Error('Invalid Order!')
}

it('Should create order', async () => {
  const newOrder = await createOrder(order)(saveOrder)
  expect(newOrder).toEqual(right(order))
})

it('product_list = [] should thow error', async () => {
  const newOrder = await createOrder(order2)(saveOrder)
  expect(newOrder).toEqual(left(new Error('Invalid Order!')))
})

it('should createOrder thow error', async () => {
  const newOrder = await createOrder(order)(saveOrderError)
  expect(newOrder).toEqual(left(new Error('Invalid Order!')))
})
