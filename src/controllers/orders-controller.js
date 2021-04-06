const uuid = require('uuid')

const db = getmodule('src/services/db')
const col = db.collection('orders')
const products = db.collection('products')

module.exports = {
  async list(req, res) {
    try {
      const orders = await col.find({}).toArray()
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
      const order = await col.findOne({ id: id })

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
    const productsOrder = req.body
    const productsID = productsOrder.map((product) => { return product.id })
    const productsDatabase = await products.find({ id: { $in: productsID } })
      .toArray()
    const orderTotalValue = productsDatabase.reduce((total, item) => {
      return total + item.price
    }, 0)
    const totalOrderProduct = productsOrder.reduce(
      function (total, item) { return total + item.quantity }, 0
    )

    for (key of keys) {
      if (req.body[key] === '') {
        return res.json(createErrorMessage('Please, fill all fields!'))
      }
    }
    const item = {
      id: uuid.v4(),
      total: orderTotalValue,
      quantidade: totalOrderProduct,
      products: productsOrder
    }

    try {
      const newOrder = await db.collection('orders')
        .insertOne(item)

      return res.json(Object.values(newOrder.ops))

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

    try {
      /*const item = {
        name: req.body.name || foundOrder.name,
        price: transformToDecimalNumber(req.body.price) || foundOrder.price
      }*/

      if (item.price === '' && item.price !== 0) {
        return res.json(
          createErrorMessage('Please, correctly fill in the price field!')
        )
      }

      await col.findOneAndUpdate(
        { id: id },
        { $set: item }
      )

      const editedOrder = await col.findOne({ id: id })

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
