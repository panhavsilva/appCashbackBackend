import { right, Either, left } from 'fp-ts/Either'
import { Order } from '@/core/types/order'

export type SaveOrder = (o: Either<Error, Order>) => Promise<Order|never>
type CreateOrder = (o: Order) => (f: SaveOrder) => Promise<Either<string, Order>>

const hasProduct = (order: Order): boolean => {
  return order.productList.length > 0
}
const isProductsValid = (order: Order): boolean => {
  const orderValidators = [hasProduct(order)]
  return orderValidators.every((item) => item === true)
}
const validOrder = async (order: Order): Promise<Either<Error, Order>> => {
  if (isProductsValid(order)) {
    return right(order)
  }
  return left(new Error('Invalid Product! - No products in the product list.'))
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
