import { unsafe } from '@/config/tests/fixtures'
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import { Product } from '@/core/types/product'
import { createProduct, SaveProduct } from './create-product'

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
    TE.map((newProduct) => expect(newProduct)
      .toBe(`Produto cadastrado com sucesso! ${product.name}`)),
  )
})

it('Quando o produto for válido e um erro for lançado à partir da função saveProduct, o erro deveria propagar'
  , async () => {
    return pipe(
      product,
      createProduct(saveProductError),
      TE.mapLeft((newProduct) => expect(newProduct)
        .toBe(Error('Database Error!'))),
    )
  })
