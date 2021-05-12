import { right, left } from 'fp-ts/Either'
import { createCashback, SaveCashback } from './create-cashback'
import { Cashback } from '@/core/types/cashback'

const cashback: Cashback = { min_value: 0, max_value: 100, percentage: 5 }
const cashback2: Cashback = { min_value: 100, max_value: 0, percentage: 5 }
const cashback3: Cashback = { min_value: 100, max_value: 100, percentage: 5 }
const saveCashback: SaveCashback = async (cashback: Cashback) => { return cashback }
const saveCashbackError = async (): Promise<never> => {
  throw new Error('Invalid Cashback!')
}

it('Should create cashback', async () => {
  const newCashback = await createCashback(cashback)(saveCashback)
  expect(newCashback).toEqual(right(cashback))
})

it('Should create cashback min value > max value', async () => {
  const newCashback = await createCashback(cashback2)(saveCashback)
  expect(newCashback).toEqual(left(new Error('Invalid Cashback!')))
})

it('Should create cashback min value = max value', async () => {
  const newCashback = await createCashback(cashback3)(saveCashback)
  expect(newCashback).toEqual(left(new Error('Invalid Cashback!')))
})

it('Should saveCashback throw error', async () => {
  const newCashback = await createCashback(cashback)(saveCashbackError)
  expect(newCashback).toEqual(left(new Error('Invalid Cashback!')))
})
