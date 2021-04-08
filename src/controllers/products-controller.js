const uuid = require('uuid')

const { db } = getmodule('src/services/db')
const col = db.collection('products')

module.exports = {
  async list(req, res) {
    try {
      const productsDB = await col.find({}).toArray()
      const products = productsDB.map((product) => {
        const { ['_id']: idMongo, ...productNoIdMongo } = product
        return productNoIdMongo
      })
      return res.json(products)

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error in the list of products!'))
    }

  },
  async show(req, res) {
    const { id } = req.params
    try {
      const { ['_id']: idMongo, ...product } = await col.findOne({ id: id })

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
      price: isNumber(req.body.price)
    }

    if (item.price === null) {
      return res.json(
        createErrorMessage('Please, correctly fill in the price field!')
      )
    }

    try {
      const newProduct = await db.collection('products')
        .insertOne(item)
      const { ['_id']: idMongo, ...product } = newProduct.ops[0]

      return res.json(product)

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error creating new product'))
    }

  },
  async edit(req, res) {
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

    const item = {
      name: req.body.name || foundProduct.name,
      price: isNumber(req.body.price) || foundProduct.price
    }
    if (item.price === null) {
      return res.json(
        createErrorMessage('Please, correctly fill in the price field!')
      )
    }

    try {
      await col.findOneAndUpdate(
        { id: id },
        { $set: item }
      )

      const { ['_id']: idMongo, ...editedProduct } = await col.findOne({ id: id })

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

function isNumber(price) {
  if (typeof price !== ('number')) {
    return null
  }

  return price
}
