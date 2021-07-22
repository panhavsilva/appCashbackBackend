import { v4 } from 'uuid'
import { createErrorMessage } from '@/ports/express/helpers/create-error-message'
import { SaveProduct } from '@/core/product/use-cases/create-product'
import { db } from './'

export const saveProduct: SaveProduct = async (product) => {
  const item = {
    id: v4(),
    name: product.name,
    price: product.price,
  }

  try {
    const newProduct = await db.collection('products')
      .insertOne(item)
    const { _id, ...product } = newProduct.ops[0]

    return product
  } catch (error) {
    console.log('Error: ', error)

    throw createErrorMessage('Error creating new product!')
  }
}
