import { toError } from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { Product } from '../types/product'

export type SaveProduct = (p: Product) => Promise<unknown>
export type CreateProduct = (f: SaveProduct) => (p: Product) => TE.TaskEither<Error, unknown>

export const createProduct: CreateProduct = (saveProduct) => (product) => {
  return pipe(
    TE.tryCatch(
      () => saveProduct(product),
      toError,
    ),
  )
}
