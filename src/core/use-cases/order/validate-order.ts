import { right, Either, left } from 'fp-ts/Either'
import { ProductOrder } from '@/core/types/order'

const hasProduct = (productsList: ProductOrder[]): boolean => {
  return productsList.length > 0
}
const isProductsValid = (productsList: ProductOrder[]): boolean => {
  const orderValidators = [hasProduct(productsList)]
  return orderValidators.every((item) => item === true)
}
export const validateOrder = (productsList: ProductOrder[]): Either<Error, ProductOrder[]> => {
  if (isProductsValid(productsList)) {
    return right(productsList)
  }
  return left(new Error('Invalid Product! - No products in the product list.'))
}
