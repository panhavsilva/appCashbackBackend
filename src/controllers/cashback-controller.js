const uuid = require('uuid')

const { db } = getmodule('src/services/db')
const col = db.collection('cashbackRanges')

module.exports = {
  async list(req, res) {
    try {
      const cashbackRangesDB = await col.find({}).toArray()
      const cashbackRanges = cashbackRangesDB.map((cashback) => {
        const { ['_id']: idMongo, ...cashbackNoIdMongo } = cashback
        return cashbackNoIdMongo
      })
      return res.json(cashbackRanges)

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error in the list of cashback ranges!'))
    }

  },
  async create(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] === '') {
        return res.json(createErrorMessage('Please, fill all fields!'))
      }
    }

    const item = {
      id: uuid.v4(),
      name: req.body.name,
      initial: idNumber(req.body.initial),
      final: idNumber(req.body.final)
    }

    if (
      item.initial === null || item.final === null
    ) {
      return res.json(
        createErrorMessage('Please, correctly fill in the initial value field!')
      )
    }

    try {
      const newCashback = await db.collection('cashbackRanges')
        .insertOne(item)
      const { ['_id']: idMongo, ...cashback } = newCashback.ops[0]

      return res.json(cashback)

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error creating new cashback range!'))
    }

  },
  async edit(req, res) {
    const { id } = req.params
    const foundCashbackRange = await col.findOne({ id: id })
    if (foundCashbackRange === null) {
      return res.status(400)
        .json(createErrorMessage('Cashback range not found!'))
    }

    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] === '') {
        return res.json(createErrorMessage('Please, fill all fields!'))
      }
    }

    const item = {
      name: req.body.name || foundCashbackRange.name,
      initial: idNumber(req.body.initial) || foundCashbackRange.initial,
      final: idNumber(req.body.final) || foundCashbackRange.final
    }

    if (
      item.initial === null || item.final === null
    ) {
      return res.json(
        createErrorMessage('Please, correctly fill in the initial value field!')
      )
    }

    try {
      await col.findOneAndUpdate(
        { id: id },
        { $set: item }
      )

      const { ['_id']: idMongo, ...editedCashbackRange } = await col.findOne({ id: id })

      res.json(editedCashbackRange)

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error edit cashback range!'))
    }

  },
  async delete(req, res) {
    const { id } = req.params
    const foundCashbackRange = await col.findOne({ id: id })
    if (foundCashbackRange === null) {
      return res.status(400)
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

  }
}

function createErrorMessage(message) {
  return { message: message, error: true }
}

function idNumber(price) {
  if (typeof price !== ('number')) {
    return null
  }

  return price
}
