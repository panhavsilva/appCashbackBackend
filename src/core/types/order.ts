import * as t from 'io-ts'
import { positiveCodec } from './scalar/positive'
import { productCodec } from './product'

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
