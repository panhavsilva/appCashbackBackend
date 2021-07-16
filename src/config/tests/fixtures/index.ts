import { positiveCodec } from '@/core/types/scalar/positive'
import * as t from 'io-ts'

export function unsafePositiveNumber (value:number): t.TypeOf<typeof positiveCodec> {
  return value as any
}
