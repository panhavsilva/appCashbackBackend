import * as order from '@/core/order/types/order'
import { dbConnection } from './'

type SaveOrder = (c: order.OrderOutput) => Promise<unknown>

export const saveOrder: SaveOrder = async (item) => {
  const newOrderDB = await dbConnection.db.collection('orders')
    .insertOne(item)
  const { _id, ...newOrder } = newOrderDB.ops[0]

  return newOrder
}

type GetProductsList = (body: string[]) => Promise<order.ProductsDatabase[]>
export const getProductsList: GetProductsList = async (body) => {
  const productsDBcollection = dbConnection.db.collection('products')
  const productsDatabase = await productsDBcollection.find({ id: { $in: body } })
    .toArray()

  return productsDatabase
}
