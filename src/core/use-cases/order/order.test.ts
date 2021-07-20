import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { ProductOrder } from '@/core/types/order'
import { createOrder, SaveOrder } from './create-order'
import { unsafe } from '@/config/tests/fixtures/index'

const order: ProductOrder[] = [
  {
    name: 'product1',
    price: unsafe(100),
    quantity: unsafe(10),
  },
  {
    name: 'product2',
    price: unsafe(200),
    quantity: unsafe(1),
  },
]
const orderProductListEmpty: ProductOrder[] = []

const saveOrder: SaveOrder = async (order) => {
  return `Pedido cadastrado com sucesso! ${order.length}`
}
const saveOrderError: SaveOrder = async () => {
  throw new Error('Database Error!')
}

it('Deve criar um pedido', async () => {
  return pipe(
    order,
    createOrder(saveOrder),
    TE.map((newOrder) => expect(newOrder).toBe(`Pedido cadastrado com sucesso! ${order.length}`)),
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

it('Quando o pedido for válido e um erro for lançado à partir da função saveOrder, o erro deveria propagar'
  , async () => {
    return pipe(
      order,
      createOrder(saveOrderError),
      TE.mapLeft((newOrder) => expect(newOrder)
        .toEqual(Error('Database Error!'))),
    )()
  })
