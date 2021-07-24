import {
  createProduct as createProductCore,
  CreateProduct,
} from '../use-cases/create-product'

export const createProduct: CreateProduct = (saveProduct) => (product) => {
  return createProductCore(saveProduct)(product)
}
