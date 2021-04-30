import { right, Either, left } from 'fp-ts/Either'
import { Cashback } from '@/core/types/cashback'

export type SaveCashback = (c: Cashback) => Promise<Cashback>
type CreateCashback = (c: Cashback) => (f: SaveCashback) => Promise<Either<string, Cashback>>

export const createCashback: CreateCashback = (cashback) => async (saveCashback) => {
  try {
    const newProduct = await saveCashback(cashback)
    return right(newProduct)
  } catch (e) {
    return left(e)
  }
}
