import { right, left } from 'fp-ts/Either'
import { Order } from '@/core/types/order'
import { createOrder, SaveOrder } from './create-order'

const order: Order = {
  orderValue: 100,
  productList: [
    { name: 'product1', price: 100, quantity: 10 },
    { name: 'product2', price: 200, quantity: 1 },
  ],
}
const order2: Order = {
  orderValue: 0,
  productList: [],
}

const saveOrder: SaveOrder = async (order) => {
  return order
}
const saveOrderError = async (): Promise<never> => {
  throw new Error('Invalid Order!')
}

it('Deve criar um pedido', async () => {
  const newOrder = await createOrder(order)(saveOrder)
  expect(newOrder).toEqual(right(order))
})

it('Deve lançar um erro quando productList for um array vazio', async () => {
  const newOrder = await createOrder(order2)(saveOrder)
  expect(newOrder).toEqual(left(new Error('Invalid Product!')))
})

it('Deve lançar um erro quando utilizado saveOrderError', async () => {
  const newOrder = await createOrder(order)(saveOrderError)
  expect(newOrder).toEqual(left(new Error('Invalid Order!')))
})
