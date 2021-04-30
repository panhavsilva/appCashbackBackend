import { right, left } from 'fp-ts/Either'
import { createProduct, SaveProduct } from './create-product'

const product = { name: 'product', price: 10 }
const saveProduct: SaveProduct = async (product) => { return product }
const saveProductError = async (): Promise<never> => {
  throw new Error('Produto Invalido!')
}

it('should create a product', async () => {
  const newProduct = await createProduct(product)(saveProduct)
  expect(newProduct).toEqual(right(product))
})

it('should saveProduct throw error', async () => {
  const newProduct = await createProduct(product)(saveProductError)
  expect(newProduct).toEqual(left(new Error('Produto Invalido!')))
})
