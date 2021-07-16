import * as t from 'io-ts'
import { positiveCodec } from './scalar/positive'

export const productCodec = t.type({
  name: t.string,
  price: positiveCodec,
})

export type Product = t.TypeOf<typeof productCodec>
