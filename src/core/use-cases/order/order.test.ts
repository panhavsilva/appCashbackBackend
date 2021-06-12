import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { Order } from '@/core/types/order'
import { createOrder, SaveOrder } from './create-order'

const order: Order = {
  orderValue: 100,
  productList: [
    { name: 'product1', price: 100, quantity: 10 },
    { name: 'product2', price: 200, quantity: 1 },
  ],
}
const orderProductListEmpty: Order = {
  orderValue: 0,
  productList: [],
}

const saveOrder: SaveOrder = async (order) => {
  return `Pedido cadastrado com sucesso! ${order.orderValue}`
}
const saveOrderError: SaveOrder = async () => {
  throw new Error('Database Error!')
}

it('Deve criar um pedido', async () => {
  return pipe(
    order,
    createOrder(saveOrder),
    TE.map((newOrder) => expect(newOrder).toBe(`Pedido cadastrado com sucesso! ${order.orderValue}`)),
  )()
})

it('Deve lançar um erro quando productList for um array vazio', async () => {
  return pipe(
    orderProductListEmpty,
    createOrder(saveOrderError),
    TE.map((newOrder) => expect(newOrder)
      .toEqual(Error('Invalid Product! - No products in the product list.'))),
  )()
})

it('Deve lançar um erro quando utilizado saveOrderError', async () => {
  return pipe(
    order,
    createOrder(saveOrderError),
    TE.mapLeft((newOrder) => expect(newOrder)
      .toEqual(Error('Database Error!'))),
  )()
})
