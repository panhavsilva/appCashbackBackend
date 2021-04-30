import { right, Either, left } from 'fp-ts/Either'
import { Order } from '@/core/types/order'

export type SaveOrder = (o: Order) => Promise<Order>
type CreateOrder = (o: Order) => (f: SaveOrder) => Promise<Either<string, Order>>

export const createOrder: CreateOrder = (order: Order) => async (saveOrder) => {
  try {
    const newOrder = await saveOrder(order)
    return right(newOrder)
  } catch (e) {
    return left(e)
  }
}
