import { v4 } from 'uuid'
import { ProductOutput } from '@/core/product/types/product'
import { createErrorMessage } from '@/ports/express/helpers/create-error-message'
import { SaveProduct } from '@/core/product/use-cases/create-product'
import * as dbProduct from './'

export const saveProduct: SaveProduct = async (product) => {
  const item: ProductOutput = {
    id: v4(),
    name: product.name,
    price: product.price,
  }

  try {
    return dbProduct.saveProduct(item)
  } catch (error) {
    console.log('Error: ', error)

    throw createErrorMessage('Error creating new product!')
  }
}
