import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

export function unsafe <T> (value:unknown): T {
  return value as any
}

type Callback = (a: unknown) => unknown
type MapAll = (fn: Callback) => (data: TE.TaskEither<unknown, unknown>) =>
  TE.TaskEither<unknown, unknown>

export const mapAll: MapAll = (fn) => (data) => {
  return pipe(
    data,
    TE.map(fn),
    TE.mapLeft(fn),
  )
}

export function getErrorMessage (error: unknown): string {
  return Array.isArray(error) ? error[0].message : ''
}
