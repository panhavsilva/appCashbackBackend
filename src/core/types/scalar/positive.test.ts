import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import { positiveCodec } from './positive'

it('Deveria validar números positivos corretamente', async () => {
  return pipe(
    1,
    positiveCodec.decode,
    E.map(result => expect(result).toBe(1)),
  )
})

it('Deveria validar números zero corretamente', async () => {
  return pipe(
    0,
    positiveCodec.decode,
    E.map(result => expect(result).toBe(0)),
  )
})

it('Não Deveria aceitar números negativos', async () => {
  return pipe(
    -1,
    positiveCodec.decode,
    E.mapLeft(result => expect(result[0]?.message)
      .toBe('Invalid number! Number is not positive!')),
  )
})
