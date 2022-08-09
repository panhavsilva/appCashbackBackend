import {
  createCashback as createCashbackCore,
  CreateCashback,
} from '../use-cases/create-cashback'

export const createCashback: CreateCashback = (saveCashback) => (cashback) => {
  return createCashbackCore(saveCashback)(cashback)
}
