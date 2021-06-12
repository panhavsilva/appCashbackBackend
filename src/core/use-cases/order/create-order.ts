import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { right, Either, left, toError } from 'fp-ts/Either'
import { Order } from '@/core/types/order'

export type SaveOrder = (o: Order) => Promise<unknown>
type CreateOrder = (f: SaveOrder) => (o: Order) => TE.TaskEither<Error, unknown>

const hasProduct = (order: Order): boolean => {
  return order.productList.length > 0
}
const isProductsValid = (order: Order): boolean => {
  const orderValidators = [hasProduct(order)]
  return orderValidators.every((item) => item === true)
}
const validOrder = (order: Order): Either<Error, Order> => {
  if (isProductsValid(order)) {
    return right(order)
  }
  return left(new Error('Invalid Product! - No products in the product list.'))
}

export const createOrder: CreateOrder = (saveOrder) => (order: Order) => {
  return pipe(
    order,
    validOrder,
    TE.fromEither,
    TE.chain((order) => TE.tryCatch(
      () => saveOrder(order),
      toError,
    )),
  )
}
