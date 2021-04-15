import uuid from 'uuid'
import { Request, Response } from 'express'
import { createErrorMessage, isNumber } from '@/helpers'

import mongo from '@/services/db'
const { db } = mongo
const col = db.collection('products')

export default {
  async list (_req: Request, res: Response) {
    try {
      const productsDB = await col.find({}).toArray()
      const products = productsDB.map((product) => {
        const { _id: idMongo, ...productNoIdMongo } = product
        return productNoIdMongo
      })
      return res.json(products)
    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error in the list of products!'))
    }
  },
  async show (req: Request, res: Response) {
    const { id } = req.params
    try {
      const { _id: idMongo, ...product } = await col.findOne({ id: id })

      if (product === null) {
        return res.status(404)
          .json(createErrorMessage('Product not found!'))
      }

      return res.json(product)
    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error show product'))
    }
  },
  async create (req: Request, res: Response) {
    const keys = Object.keys(req.body)

    for (const key of keys) {
      if (req.body[key] === '') {
        return res.status(400).json(createErrorMessage('Please, fill all fields!'))
      }
    }

    if (!isNumber(req.body.price)) {
      return res.status(400).json(createErrorMessage('Please, correctly fill field!'))
    }

    const item = {
      id: uuid.v4(),
      name: req.body.name,
      price: req.body.price
    }

    try {
      const newProduct = await db.collection('products')
        .insertOne(item)
      const { _id: idMongo, ...product } = newProduct.ops[0]

      return res.json(product)
    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error creating new product'))
    }
  },
  async edit (req: Request, res: Response) {
    const { id } = req.params
    const foundProduct = await col.findOne({ id: id })
    if (foundProduct === null) {
      return res.status(404)
        .json(createErrorMessage('Product not found!'))
    }

    const keys = Object.keys(req.body)
    for (const key of keys) {
      if (req.body[key] === '') {
        return res.status(400).json(createErrorMessage('Please, fill all fields!'))
      }
    }

    if (!isNumber(req.body.price)) {
      return res.status(400).json(createErrorMessage('Please, correctly fill field!'))
    }

    const item = {
      name: req.body.name || foundProduct.name,
      price: req.body.price || foundProduct.price
    }

    try {
      await col.findOneAndUpdate(
        { id: id },
        { $set: item }
      )

      const { _id: idMongo, ...editedProduct } = await col.findOne({ id: id })

      return res.json(editedProduct)
    } catch (error) {
      console.log('Error: ', error)

      return res.status(400)
        .json(createErrorMessage('Error edit product'))
    }
  },
  async delete (req: Request, res: Response) {
    const { id } = req.params
    const foundProduct = await col.findOne({ id: id })
    if (foundProduct === null) {
      return res.status(404)
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
