import uuid from 'uuid'
import { Request, Response } from 'express'
import { createErrorMessage } from '@/helpers'

import mongo from '@/services/db'
const { db } = mongo
const col = db.collection('orders')
const products = db.collection('products')

type OrderBody = {
  id: string
  quantity: number
}

export default {
  async list (_req: Request, res: Response) {
    try {
      const ordersDB = await col.find({}).toArray()
      const orders = ordersDB.map((order) => {
        const { _id: idMongo, ...orderNoIdMongo } = order
        return orderNoIdMongo
      })

      return res.json(orders)
    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error in the list of orders!'))
    }
  },
  async show (req: Request, res: Response) {
    const { id } = req.params
    try {
      const { _id: idMongo, ...order } = await col.findOne({ id: id })

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
  async create (req: Request, res: Response) {
    const keys = Object.keys(req.body)
    for (const key of keys) {
      if (req.body[key] === '') {
        return res.json(createErrorMessage('Please, fill all fields!'))
      }
    }

    const productsFront: OrderBody[] = req.body
    const productsID = productsFront.map((product) => { return product.id })
    const productsDatabase = await products.find({ id: { $in: productsID } })
      .toArray()
    const productsOrder = productsDatabase.map((product) => {
      const { _id: idMongo, ...productNoIdMongo } = product
      return productNoIdMongo
    })

    for (const item of productsFront) {
      for (const product of productsOrder) {
        if (item.id === product.id) {
          product.quantity = Number(item.quantity)
        }
      }
    }

    const orderTotalValue = productsOrder.reduce((total, item) => {
      total = total + (item.quantity * item.price)
      return parseFloat(total.toFixed(2))
    }, 0)
    const totalOrderProduct = productsFront.reduce((total, item) => {
      return Number(total + item.quantity)
    }, 0)

    const item = {
      id: uuid.v4(),
      total: orderTotalValue,
      quantity: totalOrderProduct,
      products: productsOrder
    }

    try {
      const newOrderDB = await db.collection('orders')
        .insertOne(item)
      const { _id: idMongo, ...newOrder } = newOrderDB.ops[0]

      return res.json(newOrder)
    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error creating new order!'))
    }
  },
  async edit (req: Request, res: Response) {
    const { id } = req.params
    const foundOrder = await col.findOne({ id: id })
    if (foundOrder === null) {
      return res.status(400)
        .json(createErrorMessage('Order not found!'))
    }

    const keys = Object.keys(req.body)
    for (const key of keys) {
      if (req.body[key] === '') {
        return res.json(createErrorMessage('Please, fill all fields!'))
      }
    }

    const productsFront: OrderBody[] = req.body
    const productsID = productsFront.map((product) => { return product.id })
    const productsDatabase = await products.find({ id: { $in: productsID } })
      .toArray()
    const productsOrder = productsDatabase.map((product) => {
      const { _id: idMongo, ...productNoIdMongo } = product
      return productNoIdMongo
    })

    for (const item of productsFront) {
      for (const product of productsOrder) {
        if (item.id === product.id) {
          product.quantity = Number(item.quantity)
        }
      }
    }

    const orderTotalValue = productsOrder.reduce((total, item) => {
      total = total + (item.quantity * item.price)
      return parseFloat(total.toFixed(2))
    }, 0)
    const totalOrderProduct = productsFront.reduce((total, item) => {
      return Number(total + item.quantity)
    }, 0)

    const item = {
      total: orderTotalValue,
      quantity: totalOrderProduct,
      products: productsOrder
    }

    try {
      await col.findOneAndUpdate(
        { id: id },
        { $set: item }
      )

      const { _id: idMongo, ...editedOrder } = await col.findOne({ id: id })

      return res.json(editedOrder)
    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error edit order!'))
    }
  },
  async delete (req: Request, res: Response) {
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
