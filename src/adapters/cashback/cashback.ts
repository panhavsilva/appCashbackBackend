import {
  createCashback as createCashbackCore,
  CreateCashback,
} from '@/core/use-cases/cashback/create-cashback'

export const createCashback: CreateCashback = (saveCashback) => (cashback) => {
  return createCashbackCore(saveCashback)(cashback)
}
