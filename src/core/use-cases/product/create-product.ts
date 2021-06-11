import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { toError } from 'fp-ts/Either'
import { Product } from '@/core/types/product'

export type SaveProduct = (p: Product) => Promise<unknown>
type CreateProduct = (f: SaveProduct) => (p: Product) => TE.TaskEither<Error, unknown>

export const createProduct: CreateProduct = (saveProduct) => (product) => {
  return pipe(
    TE.tryCatch(
      () => saveProduct(product),
      toError,
    ),
  )
}
