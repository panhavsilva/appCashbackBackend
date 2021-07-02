import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { toError } from 'fp-ts/Either'
import { Order } from '@/core/types/order'
import { validateOrder } from './validateOrder'

export type SaveOrder = (o: Order) => Promise<unknown>
export type CreateOrder = (f: SaveOrder) => (o: Order) => TE.TaskEither<Error, unknown>

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

/*
const keys = Object.keys(req.body)
for (const key of keys) {
  if (req.body[key] === '') {
    return res.status(400).json(createErrorMessage('Please, fill all fields!'))
  }
}
*/
