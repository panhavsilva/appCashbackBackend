import { Product } from './product'
type ProductOrder = Product & { quantity: number }

export type Order = {
  orderValue: number
  productList: ProductOrder[]
}
