import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import { createProduct, SaveProduct } from './create-product'

const product = { name: 'product', price: 10 }
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
    TE.map((newProduct) => expect(newProduct)
      .toBe(`Produto cadastrado com sucesso! ${product.name}`)),
  )
})

it('Deve lançar um erro quando utilizado saveProductError', async () => {
  return pipe(
    product,
    createProduct(saveProductError),
    TE.mapLeft((newProduct) => expect(newProduct)
      .toBe(Error('Database Error!'))),
  )
})
