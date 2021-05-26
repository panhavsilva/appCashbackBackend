import { right, Either, left } from 'fp-ts/Either'
import { Cashback } from '@/core/types/cashback'

export type SaveCashback = (c: Either<Error, Cashback>) => Promise<Cashback|never>
type CreateCashback = (c: Cashback) => (f: SaveCashback) => Promise<Either<string, Cashback>>

const isMinSmallMax = (cashback: Cashback): boolean => {
  return cashback.minValue < cashback.maxValue
}
const isCashbackValid = (cashback: Cashback): boolean => {
  const cashbackValidators = [isMinSmallMax(cashback)]
  return cashbackValidators.every((item) => item === true)
}
const validCashback = async (cashback: Cashback): Promise<Either<Error, Cashback>> => {
  if (isCashbackValid(cashback)) {
    return right(cashback)
  }
  return left(
    new Error('Invalid Cashback! - min value should be less then max value.')
  )
}

export const createCashback: CreateCashback = (cashback) => async (saveCashback) => {
  try {
    const newCashback = await validCashback(cashback)
    const saveNewCashback = await saveCashback(newCashback)
    return right(saveNewCashback)
  } catch (e) {
    return left(e)
  }
}
