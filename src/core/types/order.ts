import { Product } from './product'
type ProductOrder = Product & { quantity: number }

export type Order = {
  order_value: number
  product_list: ProductOrder[]
}
