import { right, Either, left, toError } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import { Cashback } from '@/core/types/cashback'

export type SaveCashback = (c: Cashback) => Promise<unknown>
type CreateCashback = (f: SaveCashback) => (c: Cashback) => TE.TaskEither<Error, unknown>

const isMinSmallMax = (cashback: Cashback): boolean => {
  return cashback.minValue < cashback.maxValue
}
const isCashbackValid = (cashback: Cashback): boolean => {
  const cashbackValidators = [isMinSmallMax(cashback)]
  return cashbackValidators.every((item) => item === true)
}
const validCashback = (cashback: Cashback): Either<Error, Cashback> => {
  if (isCashbackValid(cashback)) {
    return right(cashback)
  }
  return left(
    new Error('Invalid Cashback! - min value should be less then max value.'))
}

export const createCashback: CreateCashback = (saveCashback) => (cashback) => {
  return pipe(
    cashback,
    validCashback,
    TE.fromEither,
    TE.chain((cashback) => TE.tryCatch(
      () => saveCashback(cashback),
      toError,
    )),
  )
}
