import { right, Either, left } from 'fp-ts/Either'
import { Cashback } from '@/core/types/cashback'

export type SaveCashback = (c: Cashback) => Promise<Cashback>
type CreateCashback = (c: Cashback) => (f: SaveCashback) => Promise<Either<string, Cashback>>

const isMinSmallMax = (c: Cashback): boolean => {
  return c.min_value < c.max_value
}
const isCashbackValid = (c: Cashback): boolean => {
  const cashbackItems = [isMinSmallMax(c)]
  return cashbackItems.every((item) => item === true)
}
const validCashback = async (c: Cashback): Promise<Cashback> => {
  if (isCashbackValid(c)) {
    return c
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
