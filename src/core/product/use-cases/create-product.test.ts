import { pipe } from 'fp-ts/function'
import { Product } from '../types/product'
import { createProduct, SaveProduct } from './create-product'
import { unsafe, mapAll } from '@/config/tests/fixtures'

const product: Product = {
  name: 'product',
  price: unsafe(10),
}
const saveProduct: SaveProduct = async (product) => {
  return `Produto cadastrado com sucesso! ${product.name}`
}
const saveProductError: SaveProduct = async () => {
  throw new Error('Database Error!')
}

it('Deve criar um produto', async () => {
  return pipe(
    product,
    createProduct(saveProduct),
    mapAll((newProduct) => expect(newProduct)
      .toBe(`Produto cadastrado com sucesso! ${product.name}`)),
  )()
})

it('Quando o produto for válido e um erro for lançado à partir da função saveProduct, o erro deveria propagar'
  , async () => {
    return pipe(
      product,
      createProduct(saveProductError),
      mapAll((newProduct) => expect(newProduct)
        .toEqual(Error('Database Error!'))),
    )()
  })
