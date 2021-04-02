const fs = require('fs')
const data = require('../data.json')
const uuid = require('uuid')
const db = require('../services/db')

module.exports = {
  list(req, res) {
    return res.json(Object.values(data.products))
  },
  show(req, res) {
    const { id } = req.params
    const product = data.products[id]

    if (!product) {
      return res.json(createErrorMessage('Product not found!'))
    }

    return res.json(product)
  },
  async post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] === '') {
        return res.json(createErrorMessage('Please, fill all fields!'))
      }
    }

    const { name, price } = req.body
    const id = uuid.v4()
    const priceNumber = onlyNumber(price)
    if (priceNumber === '' && priceNumber !== 0) {
      return res.json(
        createErrorMessage('Please, correctly fill in the price field!')
      )
    }

    try {
      const newProduct = await db.collection('products')
        .insertOne({ id, name, price: priceNumber })

      return res.json(Object.values(newProduct.ops))

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400).json(createErrorMessage(error))
    }

  },
  put(req, res) {
    const { id } = req.params
    const foundProduct = data.products[id]

    if (!foundProduct) {
      return res.json(createErrorMessage('Product not found!'))
    }

    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] === '') {
        return res.json(createErrorMessage('Please, fill all fields!'))
      }
    }

    const priceNumber = onlyNumber(req.body.price) ?? foundProduct.price
    if (priceNumber === '' && priceNumber !== 0) {
      return res.json(
        createErrorMessage('Please, correctly fill in the price field!')
      )
    }

    data.products[id] = {
      ...foundProduct,
      price: priceNumber,
      name: req.body.name || foundProduct.name
    }

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        return res.json(createErrorMessage('Write error!'))
      }
      return res.json(data.products[id])
    })
  },
  delete(req, res) {
    const { id } = req.params

    if (!data.products[id]) {
      return res.json(createErrorMessage('Product not found!'))
    }

    const { [id]: removeId, ...products } = data.products
    data.products = products

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        return res.json(createErrorMessage('Write File Error!'))
      }
      return res.json({ id: id })
    })
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
