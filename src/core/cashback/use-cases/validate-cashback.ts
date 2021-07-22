import { right, Either, left } from 'fp-ts/Either'

import { Cashback } from '../types/cashback'

const isMinValueLessThanMaxValue = (cashback: Cashback): boolean => {
  return cashback.minValue < cashback.maxValue
}
const isCashbackValid = (cashback: Cashback): boolean => {
  const cashbackValidators = [isMinValueLessThanMaxValue(cashback)]
  return cashbackValidators.every((item) => item === true)
}
export const validateCashback = (cashback: Cashback): Either<Error, Cashback> => {
  if (isCashbackValid(cashback)) {
    return right(cashback)
  }
  return left(
    new Error('Invalid Cashback! - min value should be less then max value.'))
}
