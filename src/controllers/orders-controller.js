const uuid = require('uuid')

const { db } = getmodule('src/services/db')
const col = db.collection('orders')
const products = db.collection('products')

module.exports = {
  async list(req, res) {
    try {
      const ordersDB = await col.find({}).toArray()
      const orders = ordersDB.map((order) => {
        const { ['_id']: idMongo, ...orderNoIdMongo } = order
        return orderNoIdMongo
      })

      return res.json(orders)

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error in the list of orders!'))
    }

  },
  async show(req, res) {
    const { id } = req.params
    try {
      const { ['_id']: idMongo, ...order } = await col.findOne({ id: id })

      if (order === null) {
        return res.status(400)
          .json(createErrorMessage('Order not found!'))
      }

      return res.json(order)

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error show order!'))
    }

  },
  async create(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] === '') {
        return res.json(createErrorMessage('Please, fill all fields!'))
      }
    }

    const productsOrder = req.body
    const productsID = productsOrder.map((product) => { return product.id })
    const productsDB = await products.find({ id: { $in: productsID } })
      .toArray()
    const productsDatabase = productsDB.map((product) => {
      const { ['_id']: idMongo, ...productNoIdMongo } = product
      return productNoIdMongo
    })

    for (const item of productsOrder) {
      for (const product of productsDatabase) {
        if (item.id === product.id) {
          product.quantity = item.quantity
        }
      }
    }

    const orderTotalValue = productsDatabase.reduce((total, item) => {
      const result = total + (item.quantity * item.price)
      return parseFloat(result.toFixed(2))
    }, 0)
    const totalOrderProduct = productsOrder.reduce((total, item) => {
      return total + item.quantity
    }, 0)

    const item = {
      id: uuid.v4(),
      total: orderTotalValue,
      quantity: totalOrderProduct,
      products: productsDatabase
    }

    try {
      const newOrderDB = await db.collection('orders')
        .insertOne(item)
      const { ['_id']: idMongo, ...newOrder } = newOrderDB.ops[0]

      return res.json(newOrder)

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error creating new order!'))
    }

  },
  async edit(req, res) {
    const { id } = req.params
    const foundOrder = await col.findOne({ id: id })
    if (foundOrder === null) {
      return res.status(400)
        .json(createErrorMessage('Order not found!'))
    }

    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] === '') {
        return res.json(createErrorMessage('Please, fill all fields!'))
      }
    }

    const newProductsOrder = req.body
    const productsID = newProductsOrder.map((product) => { return product.id })
    const productsDB = await products.find({ id: { $in: productsID } })
      .toArray()
    const productsDatabase = productsDB.map((product) => {
      const { ['_id']: idMongo, ...productNoIdMongo } = product
      return productNoIdMongo
    })

    for (const item of newProductsOrder) {
      for (const product of productsDatabase) {
        if (item.id === product.id) {
          product.quantity = item.quantity
        }
      }
    }

    const orderTotalValue = productsDatabase.reduce((total, item) => {
      const result = total + (item.quantity * item.price)
      return parseFloat(result.toFixed(2))
    }, 0)
    const totalOrderProduct = newProductsOrder.reduce((total, item) => {
      return total + item.quantity
    }, 0)

    const item = {
      total: orderTotalValue,
      quantity: totalOrderProduct,
      products: productsDatabase
    }

    try {
      await col.findOneAndUpdate(
        { id: id },
        { $set: item }
      )

      const { ['_id']: idMongo, ...editedOrder } = await col.findOne({ id: id })

      res.json(editedOrder)

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error edit order!'))
    }

  },
  async delete(req, res) {
    const { id } = req.params
    const foundOrder = await col.findOne({ id: id })
    if (foundOrder === null) {
      return res.status(400)
        .json(createErrorMessage('Order not found!'))
    }

    try {
      await col.deleteOne({ id: id })
      return res.json({ id: id })

    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error delete order!'))
    }

  }
}

function createErrorMessage(message) {
  return { message: message, error: true }
}
