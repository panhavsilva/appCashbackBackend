import { Product } from './product'
export type ProductOrder = Product & { quantity: number }

export type Order = {
  orderValue: number
  productList: ProductOrder[]
}

export type OrderBody = {
  id: string
  quantity: number
}

export type ProductsDatabase = OrderBody & Product
