import {
  createProduct as createProductCore,
  CreateProduct,
} from '@/core/use-cases/product/create-product'

export const createProduct: CreateProduct = (saveProduct) => (product) => {
  return createProductCore(saveProduct)(product)
}
