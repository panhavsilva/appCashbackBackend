import { ProductOutput } from '@/core/product/types/product'
import { dbConnection } from './'

type SaveProduct = (c: ProductOutput) => Promise<unknown>

export const saveProduct: SaveProduct = async (item) => {
  const newProduct = await dbConnection.db.collection('products')
    .insertOne(item)
  const { _id, ...product } = newProduct.ops[0]
  return product
}
