import { toError } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'

import { validateCashback } from './validate-cashback'
import { Cashback } from '../types/cashback'

export type SaveCashback = (c: Cashback) => Promise<unknown>
export type CreateCashback = (f: SaveCashback) => (c: Cashback) => TE.TaskEither<Error, unknown>

export const createCashback: CreateCashback = (saveCashback) => (cashback) => {
  return pipe(
    cashback,
    validateCashback,
    TE.fromEither,
    TE.chain((cashback) => TE.tryCatch(
      () => saveCashback(cashback),
      toError,
    )),
  )
}
/*
const keys = Object.keys(req.body)
    for (const key of keys) {
      if (req.body[key] === '') {
        return res.json(createErrorMessage('Please, fill all fields!'))
      }
    }

    if (!isNumber(req.body.initial) || !isNumber(req.body.final)) {
      return res.status(400).json(createErrorMessage('Please, fill all fields!'))
    }
*/
