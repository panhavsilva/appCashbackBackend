import { CashbackOutput } from '@/core/cashback/types/cashback'
import { dbConnection } from './'

type SaveCashback = (c: CashbackOutput) => Promise<unknown>

export const saveCashback: SaveCashback = async (item) => {
  const newCashback = await dbConnection.db.collection('cashbackRanges')
    .insertOne(item)
  const { _id, ...cashback } = newCashback.ops[0]
  return cashback
}
