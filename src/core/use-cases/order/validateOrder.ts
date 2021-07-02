import { right, Either, left } from 'fp-ts/Either'
import { Order } from '@/core/types/order'

const hasProduct = (order: Order): boolean => {
  return order.productList.length > 0
}
const isProductsValid = (order: Order): boolean => {
  const orderValidators = [hasProduct(order)]
  return orderValidators.every((item) => item === true)
}
export const validateOrder = (order: Order): Either<Error, Order> => {
  if (isProductsValid(order)) {
    return right(order)
  }
  return left(new Error('Invalid Product! - No products in the product list.'))
}
