import * as t from 'io-ts'
import { UUID } from 'io-ts-types'
import { positiveCodec } from '@/core/scalar-types/positive'
import { productCodec } from '@/core/product/types/product'

export const productOrderCodec = t.type({
  name: t.string,
  price: positiveCodec,
  quantity: positiveCodec,
})
export type ProductOrder = t.TypeOf<typeof productOrderCodec>

export const orderCodec = t.type({
  orderValue: positiveCodec,
  productList: t.array(productCodec),
})
export type Order = t.TypeOf<typeof orderCodec>

export const orderInputCodec = t.type({
  id: t.string,
  quantity: positiveCodec,
})
export type OrderInput = t.TypeOf<typeof orderInputCodec>

export const productsDatabaseCodec = t.type({
  id: t.string,
  name: t.string,
  price: positiveCodec,
  quantity: positiveCodec,
})
export type ProductsDatabase = t.TypeOf<typeof productsDatabaseCodec>

export const orderOutputCodec = t.type({
  id: UUID,
  total: positiveCodec,
  quantity: positiveCodec,
  products: t.array(productOrderCodec),
})

export type OrderOutput = t.OutputOf<typeof orderOutputCodec>
