import { v4 } from 'uuid'
import { createErrorMessage } from '@/ports/express/helpers/create-error-message'
import { SaveOrder } from '@/core/order/use-cases/create-order'
import * as order from '@/core/order/types/order'
import { PositiveOutput } from '@/core/scalar-types/positive'
import * as dbOrder from './'

export const saveOrder: SaveOrder<unknown> = async (productsOrder) => {
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
    const result = await dbOrder.saveOrder(item)
    return result
  } catch (error) {
    console.log('Error: ', error)

    throw createErrorMessage('Error creating new order!')
  }
}

type FilterBodyQuantityProduct = (body: order.OrderInput[], id: string) => PositiveOutput
const filterBodyQuantityProduct: FilterBodyQuantityProduct = (body, id) => {
  const productBody = body.filter((product) => product.id === id)
  return productBody[0]?.quantity || 0
}

type IncludeBodyQuantityProduct = (body: order.OrderInput[], productsDatabase: order.ProductsDatabase[]) => order.ProductOrderOutput[]
const includeBodyQuantityProductInProductDb: IncludeBodyQuantityProduct = (body, productsOrder) => {
  const newProductsOrder = productsOrder.map((product) => {
    return { ...product, quantity: filterBodyQuantityProduct(body, product.id) }
  })

  return newProductsOrder
}

type GetProductsList = (body: order.OrderInputList) => Promise<order.ProductOrderOutput[]>
export const getProductsList: GetProductsList = async (body) => {
  const productsID = body.map((product) => { return product.id })
  const productsDatabase = await dbOrder.getProductsList(productsID)
  const productsOrder = includeBodyQuantityProductInProductDb(body, productsDatabase)

  return productsOrder
}