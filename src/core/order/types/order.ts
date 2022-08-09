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
export type ProductOrderOutput = t.OutputOf<typeof productOrderCodec>

export const productsOrderCodec = t.array(productOrderCodec)
export type ProductsOrder = t.TypeOf<typeof productsOrderCodec>

export const orderCodec = t.type({
  orderValue: positiveCodec,
  productList: t.array(productCodec),
})
export type Order = t.TypeOf<typeof orderCodec>

export const orderInputCodec = t.type({
  id: UUID,
  quantity: positiveCodec,
})
export type OrderInput = t.TypeOf<typeof orderInputCodec>

export const orderInputListCodec = t.array(orderInputCodec)
export type OrderInputList = t.TypeOf<typeof orderInputListCodec>

export const productsDatabaseCodec = t.type({
  id: UUID,
  name: t.string,
  price: positiveCodec,
  quantity: positiveCodec,
})
export type ProductsDatabase = t.OutputOf<typeof productsDatabaseCodec>
export const productsDbCodec = t.array(productsDatabaseCodec)
export type ProductsDb = t.OutputOf<typeof productsDbCodec>

export const orderOutputCodec = t.type({
  id: UUID,
  total: positiveCodec,
  quantity: positiveCodec,
  products: t.array(productOrderCodec),
})

export type OrderOutput = t.OutputOf<typeof orderOutputCodec>
