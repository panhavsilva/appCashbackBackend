import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import { Request, Response } from 'express'

import { createErrorMessage, isNumber } from '@/ports/express/helpers'
import { createCashback } from '@/adapters'
import { saveCashback } from '@/adapters/db/mongo'
import mongo from '@/ports/mongo/db'

const { db } = mongo
const col = db.collection('cashbackRanges')

export default {
  async list (_req: Request, res: Response) {
    try {
      const cashbackRangesDB = await col.find({}).toArray()
      const cashbackRanges = cashbackRangesDB.map((cashback) => {
        const { _id, ...cashbackNoIdMongo } = cashback
        return cashbackNoIdMongo
      })
      return res.json(cashbackRanges)
    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error in the list of cashback ranges!'))
    }
  },
  async create (req: Request, res: Response) {
    return pipe(
      req.body,
      createCashback(saveCashback),
      TE.map((data) => res.json(data)),
      TE.mapLeft((e) => res.status(400).json(e.message)),
    )()
  },
  async edit (req: Request, res: Response) {
    const { id } = req.params
    const foundCashbackRange = await col.findOne({ id: id })
    if (foundCashbackRange === null) {
      return res.status(404)
        .json(createErrorMessage('Cashback range not found!'))
    }

    const keys = Object.keys(req.body)
    for (const key of keys) {
      if (req.body[key] === '') {
        return res.status(400).json(createErrorMessage('Please, fill all fields!'))
      }
    }

    if (!isNumber(req.body.initial) || !isNumber(req.body.final)) {
      return res.status(400).json(createErrorMessage('Please, fill all fields!'))
    }

    const item = {
      name: req.body.name || foundCashbackRange.name,
      initial: req.body.initial || foundCashbackRange.initial,
      final: req.body.final || foundCashbackRange.final,
    }

    try {
      await col.findOneAndUpdate(
        { id: id },
        { $set: item },
      )

      const { _id, ...editedCashbackRange } = await col.findOne({ id: id })

      return res.json(editedCashbackRange)
    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error edit cashback range!'))
    }
  },
  async delete (req: Request, res: Response) {
    const { id } = req.params
    const foundCashbackRange = await col.findOne({ id: id })
    if (foundCashbackRange === null) {
      return res.status(404)
        .json(createErrorMessage('Cashback range not found!'))
    }

    try {
      await col.deleteOne({ id: id })
      return res.json({ id: id })
    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error delete cashback range!'))
    }
  },
}
