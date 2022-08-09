import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { toError } from 'fp-ts/Either'
import { ProductsOrder } from '../types/order'
import { validateOrder } from './validate-order'

export type SaveOrder<A> = (p: ProductsOrder) => Promise<A>
export type CreateOrder = <A>(f: SaveOrder<A>) => (p: ProductsOrder) => TE.TaskEither<Error, A>

export const createOrder: CreateOrder = (saveOrder) => (order) => {
  return pipe(
    order,
    validateOrder,
    TE.fromEither,
    TE.chain((order) => TE.tryCatch(
      () => saveOrder(order),
      toError,
    )),
  )
}
