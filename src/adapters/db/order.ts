import { v4 } from 'uuid'
import { createErrorMessage } from '@/ports/express/helpers/create-error-message'
import { SaveOrder } from '@/core/use-cases/order/create-order'
import { OrderBody, ProductOrder, ProductsDatabase } from '@/core/types/order'
import mongo from '@/ports/mongo/db'
const { db } = mongo
const productsDBcollection = db.collection('products')

export const saveOrder: SaveOrder = async (productsOrder) => {
  const orderTotalValue = productsOrder.reduce((total, item) => {
    total = total + (item.quantity * item.price)
    return parseFloat(total.toFixed(2))
  }, 0)

  const totalOrderProduct = productsOrder.reduce((total, item) => {
    return Number(total + item.quantity)
  }, 0)

  const item = {
    id: v4(),
    total: orderTotalValue,
    quantity: totalOrderProduct,
    products: productsOrder,
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

type IncludeQuantityProduct = (body: OrderBody[], productsDatabase: ProductsDatabase[]) => ProductOrder[]
const includeQuantityProduct: IncludeQuantityProduct = (body, productsOrder) => {
  for (const item of body) {
    for (const product of productsOrder) {
      if (item.id === product.id) {
        product.quantity = Number(item.quantity)
      }
    }
  }

  return productsOrder
}

type GetProductsList = (body: OrderBody[]) => Promise<ProductOrder[]>
export const getProductsList: GetProductsList = async (body) => {
  const productsID = body.map((product) => { return product.id })
  const productsDatabase = await productsDBcollection.find({ id: { $in: productsID } })
    .toArray()
  const productsOrder = productsDatabase.map((product) => {
    const { _id, ...productNoIdMongo } = product
    return productNoIdMongo
  })

  includeQuantityProduct(body, productsOrder)

  return productsOrder
}
