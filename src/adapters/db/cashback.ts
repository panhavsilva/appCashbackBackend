import { v4 } from 'uuid'
import { createErrorMessage } from '@/ports/express/helpers/create-error-message'
import { SaveCashback } from '@/core/use-cases/cashback/create-cashback'
import mongo from '@/ports/mongo/db'
const { db } = mongo

export const saveCashback: SaveCashback = async (cashback) => {
  const item = {
    id: v4(),
    name: cashback.percentage,
    initial: cashback.minValue,
    final: cashback.maxValue,
  }

  try {
    const newCashback = await db.collection('cashbackRanges')
      .insertOne(item)
    const { _id, ...cashback } = newCashback.ops[0]
    return cashback
  } catch (error) {
    console.log('Error: ', error)

    throw createErrorMessage('Error creating new cashback range!')
  }
}
