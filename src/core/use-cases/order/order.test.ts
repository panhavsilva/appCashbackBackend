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
const order3: Order = {
  order_value: 100,
  product_list: [{ name: 'product1', price: 0, quantity: 0 },
    { name: 'product2', price: 200, quantity: 1 },
  ],
}

const quantityIsZero = (order: Order): Boolean => {
  const productList = order.product_list
  return productList.every((item) => item.quantity > 0)
}
const hasProduct = (order: Order): Boolean => {
  return order.product_list.length !== 0
}
const orderValid = (order: Order): Boolean => {
  const orderItems = [
    hasProduct(order),
    quantityIsZero(order),
  ]
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

it('product_list = [] should throw error', async () => {
  const newOrder = await createOrder(order2)(saveOrder)
  expect(newOrder).toEqual(left(new Error('Invalid Order!')))
})

it('quantity = 0 should throw error', async () => {
  const newOrder = await createOrder(order3)(saveOrder)
  expect(newOrder).toEqual(left(new Error('Invalid Order!')))
})

it('should createOrder throw error', async () => {
  const newOrder = await createOrder(order)(saveOrderError)
  expect(newOrder).toEqual(left(new Error('Invalid Order!')))
})
