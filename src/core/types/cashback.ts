import * as t from 'io-ts'
import { positiveCodec } from './scalar/positive'

export const cashbackCodec = t.type({
  minValue: positiveCodec,
  maxValue: positiveCodec,
  percentage: positiveCodec,
})

export type Cashback = t.TypeOf<typeof cashbackCodec>
