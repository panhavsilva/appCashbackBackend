import { right, Either, left } from 'fp-ts/Either'
import { Product } from '@/core/types/product'

export type SaveProduct = (p: Product) => Promise<Product>
type CreateProduct = (p: Product) => (f: SaveProduct) => Promise<Either<string, Product>>

export const createProduct: CreateProduct = (product) => async (saveProduct) => {
  try {
    const newProduct = await saveProduct(product)
    return right(newProduct)
  } catch (e) {
    return left(e)
  }
}
