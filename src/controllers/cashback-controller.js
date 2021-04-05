const uuid = require('uuid')

const db = getmodule('src/services/db')
const col = db.collection('cashbackRanges')

module.exports = {
  async list(req, res) {
    try {
      const cashbackRanges = await col.find({}).toArray()
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
      initial: transformToDecimalNumber(req.body.initial),
      final: transformToDecimalNumber(req.body.final)
    }

    if (
      item.initial === '' && item.initial !== 0
    ) {
      return res.json(
        createErrorMessage('Please, correctly fill in the initial value field!')
      )
    }

    if (
      item.final === '' && item.final !== 0
    ) {
      return res.json(
        createErrorMessage('Please, correctly fill in the final value field!')
      )
    }

    try {
      const newCashback = await db.collection('cashbackRanges')
        .insertOne(item)

      return res.json(Object.values(newCashback.ops))

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

    try {
      const item = {
        name: req.body.name || foundCashbackRange.name,
        initial: transformToDecimalNumber(req.body.initial) || foundCashbackRange.initial,
        final: transformToDecimalNumber(req.body.final) || foundCashbackRange.final
      }

      if (
        item.initial === '' && item.initial !== 0
      ) {
        return res.json(
          createErrorMessage('Please, correctly fill in the initial value field!')
        )
      }

      if (
        item.final === '' && item.final !== 0
      ) {
        return res.json(
          createErrorMessage('Please, correctly fill in the final value field!')
        )
      }

      await col.findOneAndUpdate(
        { id: id },
        { $set: item }
      )

      const editedCashbackRange = await col.findOne({ id: id })

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

function transformToDecimalNumber(price) {
  if (typeof price === ('number')) {
    return price
  }

  const priceString = String(price).replace(/\D*/g, '')
  const priceDecimal = priceString.replace(/(\d\d)$/g, '.$1')

  if (priceDecimal === '') {
    return priceDecimal
  }

  const priceNumber = Number(priceDecimal)

  return priceNumber
}
