import { right, Either, left } from 'fp-ts/Either'
import { Order } from '@/core/types/order'

export type SaveOrder = (o: Order) => Promise<Order>
type CreateOrder = (o: Order) => (f: SaveOrder) => Promise<Either<string, Order>>

const hasProduct = (order: Order): boolean => {
  return order.product_list.length > 0
}
const isProductsValid = (order: Order): boolean => {
  const orderItems = [hasProduct(order)]
  return orderItems.every((item) => item === true)
}
const validOrder = async (order: Order): Promise<Order> => {
  if (isProductsValid(order)) {
    return order
  }
  throw new Error('Invalid Product!')
}

export const createOrder: CreateOrder = (order: Order) => async (saveOrder) => {
  try {
    const newOrder = await validOrder(order)
    const saveNewOrder = await saveOrder(newOrder)
    return right(saveNewOrder)
  } catch (e) {
    return left(e)
  }
}
