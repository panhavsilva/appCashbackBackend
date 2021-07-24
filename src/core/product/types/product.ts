import { UUID } from 'io-ts-types'
import * as t from 'io-ts'
import { positiveCodec } from '@/core/scalar-types/positive'

export const productCodec = t.type({
  name: t.string,
  price: positiveCodec,
})

export type Product = t.TypeOf<typeof productCodec>

export const productsOutputCodec = t.type({
  id: UUID,
  name: t.string,
  price: positiveCodec,
})

export type ProductOutput = t.OutputOf<typeof productsOutputCodec>
