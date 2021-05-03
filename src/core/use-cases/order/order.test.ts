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
  order_value: 0,
  product_list: [],
}

const saveOrder: SaveOrder = async (order) => {
  return order
}
const saveOrderError = async (): Promise<never> => {
  throw new Error('Invalid Order!')
}

it('Should create order', async () => {
  const newOrder = await createOrder(order)(saveOrder)
  expect(newOrder).toEqual(right(order))
})

it('product_list = [] should throw error', async () => {
  const newOrder = await createOrder(order2)(saveOrder)
  expect(newOrder).toEqual(left(new Error('Invalid Product!')))
})

it('should createOrder throw error', async () => {
  const newOrder = await createOrder(order)(saveOrderError)
  expect(newOrder).toEqual(left(new Error('Invalid Order!')))
})
