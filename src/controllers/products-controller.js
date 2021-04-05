const uuid = require('uuid')

const db = getmodule('src/services/db')
const col = db.collection('products')

module.exports = {
  async list(req, res) {
    try {
      const products = await col.find({}).toArray()
      return res.json(products)

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Product list error'))
    }

  },
  async show(req, res) {
    const { id } = req.params
    try {
      const product = await col.findOne({ id: id })

      if (product === null) {
        return res.status(400)
          .json(createErrorMessage('Product not found!'))
      }

      return res.json(product)

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error show product'))
    }

  },
  async post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] === '') {
        return res.json(createErrorMessage('Please, fill all fields!'))
      }
    }
    const item = {
      id: uuid.v4(),
      name: req.body.name,
      price: onlyNumber(req.body.price)
    }

    if (item.price === '' && item.price !== 0) {
      return res.json(
        createErrorMessage('Please, correctly fill in the price field!')
      )
    }

    try {
      const newProduct = await db.collection('products')
        .insertOne(item)

      return res.json(Object.values(newProduct.ops))

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error creating new product'))
    }

  },
  async put(req, res) {
    const { id } = req.params
    const foundProduct = await col.findOne({ id: id })
    if (foundProduct === null) {
      return res.status(400)
        .json(createErrorMessage('Product not found!'))
    }

    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] === '') {
        return res.json(createErrorMessage('Please, fill all fields!'))
      }
    }

    try {
      const item = {
        name: req.body.name || foundProduct.name,
        price: onlyNumber(req.body.price) || foundProduct.price
      }

      if (item.price === '' && item.price !== 0) {
        return res.json(
          createErrorMessage('Please, correctly fill in the price field!')
        )
      }

      await col.findOneAndUpdate(
        { id: id },
        { $set: item }
      )

      const editedProduct = await col.findOne({ id: id })

      res.json(editedProduct)

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error edit product'))
    }

  },
  async delete(req, res) {
    const { id } = req.params
    const foundProduct = await col.findOne({ id: id })
    if (foundProduct === null) {
      return res.status(400)
        .json(createErrorMessage('Product not found!'))
    }

    try {
      await col.deleteOne({ id: id })
      return res.json({ id: id })

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error delete product'))
    }

  }
}

function createErrorMessage(message) {
  return { message: message, error: true }
}

function onlyNumber(price) {
  const priceString = String(price).replace(/\D*/g, '')
  const priceDecimal = priceString.replace(/(\d\d)$/g, '.$1')

  if (priceDecimal === '') {
    return priceDecimal
  }

  const priceNumber = Number(priceDecimal)

  return priceNumber
}
