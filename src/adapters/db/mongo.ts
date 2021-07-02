import { v4 } from 'uuid'
import { SaveCashback } from '@/core/use-cases/cashback/create-cashback'
import { SaveProduct } from '@/core/use-cases/product/create-product'
import { SaveOrder } from '@/core/use-cases/order/create-order'
import { createErrorMessage } from '@/ports/express/helpers/create-error-message'

import mongo from '@/ports/mongo/db'
const { db } = mongo
/* const products = db.collection('products')

type OrderBody = {
  id: string
  quantity: number
} */

export const saveCashback: SaveCashback = async (cashback) => {
  const item = {
    id: v4(),
    name: cashback.percentage,
    initial: cashback.minValue,
    final: cashback.maxValue,
  }

  try {
    const newCashback = await db.collection('cashbackRanges')
      .insertOne(item)
    const { _id, ...cashback } = newCashback.ops[0]
    return cashback
  } catch (error) {
    console.log('Error: ', error)

    throw createErrorMessage('Error creating new cashback range!')
  }
}

export const saveProduct: SaveProduct = async (product) => {
  const item = {
    id: v4(),
    name: product.name,
    price: product.price,
  }

  try {
    const newProduct = await db.collection('products')
      .insertOne(item)
    const { _id, ...product } = newProduct.ops[0]

    return product
  } catch (error) {
    console.log('Error: ', error)

    throw createErrorMessage('Error creating new product!')
  }
}

export const saveOrder: SaveOrder = async (order) => {
  const productsFront = order.productList
  /* const productsID = productsFront.map((product) => { return product.id })
  const productsDatabase = await products.find({ id: { $in: productsID } })
    .toArray()
  const productsOrder = productsDatabase.map((product) => {
    const { _id, ...productNoIdMongo } = product
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
  */
  const totalOrderProduct = productsFront.reduce((total, item) => {
    return Number(total + item.quantity)
  }, 0)

  const item = {
    id: v4(),
    total: order.orderValue,
    quantity: totalOrderProduct,
    products: order.productList,
    // products: productsOrder,
  }

  try {
    const newOrderDB = await db.collection('orders')
      .insertOne(item)
    const { _id, ...newOrder } = newOrderDB.ops[0]

    return newOrder
  } catch (error) {
    console.log('Error: ', error)

    throw createErrorMessage('Error creating new order!')
  }
}
