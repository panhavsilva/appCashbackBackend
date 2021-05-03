import { right, Either, left } from 'fp-ts/Either'
import { Order } from '@/core/types/order'

export type SaveOrder = (o: Order) => Promise<Order>
type CreateOrder = (o: Order) => (f: SaveOrder) => Promise<Either<string, Order>>

const hasProduct = (order: Order): Boolean => {
  return order.product_list.length !== 0
}
const orderError = async (): Promise<never> => { throw new Error('Invalid Product!') }
const orderProductsValid = (order: Order): Boolean => {
  const orderItems = [hasProduct(order)]
  return orderItems.every((item) => item === true)
}
const validOrder = async (order: Order): Promise<Order> => {
  return orderProductsValid(order) ? order : orderError()
}

export const createOrder: CreateOrder = (order: Order) => async (saveOrder) => {
  try {
    const newOrder = await saveOrder(order)
    await validOrder(order)
    return right(newOrder)
  } catch (e) {
    return left(e)
  }
}
