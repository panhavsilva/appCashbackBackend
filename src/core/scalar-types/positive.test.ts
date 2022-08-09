import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import { positiveCodec } from './positive'
import { getErrorMessage, mapAll } from '@/config/tests/fixtures'

it('Deveria validar números positivos corretamente', async () => {
  return pipe(
    1,
    positiveCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe(1)),
  )()
})

it('Deveria validar números zero corretamente', async () => {
  return pipe(
    0,
    positiveCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe(0)),
  )()
})

it('Não Deveria aceitar números negativos', async () => {
  return pipe(
    -1,
    positiveCodec.decode,
    TE.fromEither,
    mapAll(error => {
      const errorMessage = getErrorMessage(error)
      expect(errorMessage).toBe('Invalid number! Number is not positive!')
    }),
  )()
})
