import { right, Either, left } from 'fp-ts/Either'
import { Cashback } from '@/core/types/cashback'

export type SaveCashback = (c: Cashback) => Promise<Cashback>
type CreateCashback = (c: Cashback) => (f: SaveCashback) => Promise<Either<string, Cashback>>

const isMinSmallMax = (cashback: Cashback): boolean => {
  return cashback.minValue < cashback.maxValue
}
const isCashbackValid = (cashback: Cashback): boolean => {
  const cashbackItems = [isMinSmallMax(cashback)]
  return cashbackItems.every((item) => item === true)
}
const validCashback = async (cashback: Cashback): Promise<Cashback> => {
  if (isCashbackValid(cashback)) {
    return cashback
  }
  throw new Error('Invalid Cashback!')
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
