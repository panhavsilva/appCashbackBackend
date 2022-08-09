import * as t from 'io-ts'
import { UUID } from 'io-ts-types'
import { positiveCodec } from '@/core/scalar-types/positive'

export const cashbackCodec = t.type({
  minValue: positiveCodec,
  maxValue: positiveCodec,
  percentage: positiveCodec,
})

export type Cashback = t.TypeOf<typeof cashbackCodec>

export const cashbackOutputCodec = t.type({
  id: UUID,
  initial: positiveCodec,
  final: positiveCodec,
  name: positiveCodec,
})

export type CashbackOutput = t.OutputOf<typeof cashbackOutputCodec>
