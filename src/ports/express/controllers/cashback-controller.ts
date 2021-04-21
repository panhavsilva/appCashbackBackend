import uuid from 'uuid'
import { Request, Response } from 'express'
import { createErrorMessage, isNumber } from '@/ports/express/helpers'

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
    const keys = Object.keys(req.body)
    for (const key of keys) {
      if (req.body[key] === '') {
        return res.json(createErrorMessage('Please, fill all fields!'))
      }
    }

    if (!isNumber(req.body.initial) || !isNumber(req.body.final)) {
      return res.status(400).json(createErrorMessage('Please, fill all fields!'))
    }

    const item = {
      id: uuid.v4(),
      name: req.body.name,
      initial: req.body.initial,
      final: req.body.final,
    }

    try {
      const newCashback = await db.collection('cashbackRanges')
        .insertOne(item)
      const { _id, ...cashback } = newCashback.ops[0]

      return res.json(cashback)
    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error creating new cashback range!'))
    }
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
        { $set: item }
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
