import { pipe } from 'fp-ts/function'
import { createCashback, SaveCashback } from './create-cashback'
import { Cashback } from '../types/cashback'
import { unsafe, mapAll } from '@/config/tests/fixtures'

const ValidCashback: Cashback = {
  minValue: unsafe(0),
  maxValue: unsafe(100),
  percentage: unsafe(5),
}
const cashbackMinValueGreaterThanMaxValue: Cashback = {
  minValue: unsafe(100),
  maxValue: unsafe(0),
  percentage: unsafe(5),
}
const cashbackMinValueEqualMaxValue: Cashback = {
  minValue: unsafe(100),
  maxValue: unsafe(100),
  percentage: unsafe(5),
}
const saveCashbackOk: SaveCashback = async (cashback) => {
  return `Cashback cadastrado com sucesso! ${cashback.minValue}`
}
const saveCashbackError: SaveCashback = async () => {
  throw new Error('Database Error!')
}

it('Deve criar um cashback', async () => {
  return pipe(
    ValidCashback,
    createCashback(saveCashbackOk),
    mapAll((newCashback) =>
      expect(newCashback).toBe(`Cashback cadastrado com sucesso! ${ValidCashback.minValue}`)),
  )()
})

it('Deve lançar um erro quando o minValue for maior que o maxValue', async () => {
  return pipe(
    cashbackMinValueGreaterThanMaxValue,
    createCashback(saveCashbackError),
    mapAll((newCashback) => expect(newCashback)
      .toEqual(Error('Invalid Cashback! - min value should be less then max value.'))),
  )()
})

it('Deve lançar um erro quando o minValue for igual ao maxValue', async () => {
  return pipe(
    cashbackMinValueEqualMaxValue,
    createCashback(saveCashbackError),
    mapAll((newCashback) => expect(newCashback)
      .toEqual(Error('Invalid Cashback! - min value should be less then max value.'))),
  )()
})

it('Quando o cashback for válido e um erro for lançado à partir da função saveCashback, o erro deveria propagar'
  , async () => {
    return pipe(
      ValidCashback,
      createCashback(saveCashbackError),
      mapAll((newCashback) => expect(newCashback)
        .toEqual(Error('Database Error!'))),
    )()
  })
