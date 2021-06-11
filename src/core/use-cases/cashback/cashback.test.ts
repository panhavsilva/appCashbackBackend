import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import { createCashback, SaveCashback } from './create-cashback'
import { Cashback } from '@/core/types/cashback'

const ValidCashback: Cashback = { minValue: 0, maxValue: 100, percentage: 5 }
const cashbackMinValueGraterMaxValue: Cashback = {
  minValue: 100,
  maxValue: 0,
  percentage: 5,
}
const cashbackMinValueEqualMaxValue: Cashback = {
  minValue: 100,
  maxValue: 100,
  percentage: 5,
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
    TE.map((newCashback) =>
      expect(newCashback).toBe(`Cashback cadastrado com sucesso! ${ValidCashback.minValue}`)),
  )()
})

it('Deve lançar um erro quando o minValue for maior que o maxValue', async () => {
  return pipe(
    cashbackMinValueGraterMaxValue,
    createCashback(saveCashbackError),
    TE.mapLeft((newCashback) => expect(newCashback)
      .toEqual(new Error('Invalid Cashback! - min value should be less then max value.'))),
  )()
})

it('Deve lançar um erro quando o minValue for igual ao maxValue', async () => {
  return pipe(
    cashbackMinValueEqualMaxValue,
    createCashback(saveCashbackError),
    TE.mapLeft((newCashback) => expect(newCashback)
      .toEqual(new Error('Invalid Cashback! - min value should be less then max value.'))),
  )()
})

it('Deve lançar um erro quando utilizado saveCashbackError', async () => {
  return pipe(
    ValidCashback,
    createCashback(saveCashbackError),
    TE.mapLeft((newCashback) => expect(newCashback)
      .toEqual(new Error('Database Error!'))),
  )()
})
