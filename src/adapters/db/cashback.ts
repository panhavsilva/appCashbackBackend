import { v4 } from 'uuid'
import { CashbackOutput } from '@/core/types/cashback'
import { createErrorMessage } from '@/ports/express/helpers/create-error-message'
import { SaveCashback } from '@/core/use-cases/cashback/create-cashback'
import * as dbCashback from './'

export const saveCashback: SaveCashback = async (cashback) => {
  const item: CashbackOutput = {
    id: v4(),
    name: cashback.percentage,
    initial: cashback.minValue,
    final: cashback.maxValue,
  }

  try {
    return dbCashback.saveCashback(item)
  } catch (error) {
    console.log('Error: ', error)

    throw createErrorMessage('Error creating new cashback range!')
  }
}
