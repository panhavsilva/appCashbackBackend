import { right, left, isLeft } from 'fp-ts/Either'
import { createCashback, SaveCashback } from './create-cashback'
import { Cashback } from '@/core/types/cashback'

const cashback: Cashback = { minValue: 0, maxValue: 100, percentage: 5 }
const cashback2: Cashback = { minValue: 100, maxValue: 0, percentage: 5 }
const cashback3: Cashback = { minValue: 100, maxValue: 100, percentage: 5 }
const saveCashback: SaveCashback = async (cashback) => {
  if (!isLeft(cashback)) {
    return cashback.right
  }
  throw cashback.left
}
const saveCashbackError = async (): Promise<never> => {
  throw new Error('Invalid Cashback!')
}

it('Deve criar um cashback', async () => {
  const newCashback = await createCashback(cashback)(saveCashback)
  expect(newCashback).toEqual(right(cashback))
})

it('Deve lançar um erro quando o minValue for maior que o maxValue', async () => {
  const newCashback = await createCashback(cashback2)(saveCashback)
  expect(newCashback).toEqual(
    left(new Error('Invalid Cashback! - min value should be less then max value.'))
  )
})

it('Deve lançar um erro quando o minValue for igual ao maxValue', async () => {
  const newCashback = await createCashback(cashback3)(saveCashback)
  expect(newCashback).toEqual(
    left(new Error('Invalid Cashback! - min value should be less then max value.'))
  )
})

it('Deve lançar um erro quando utilizado saveCashbackError', async () => {
  const newCashback = await createCashback(cashback)(saveCashbackError)
  expect(newCashback).toEqual(left(new Error('Invalid Cashback!')))
})
