import {
  CreateOrder,
  createOrder as createOrderCore,
} from '@/core/use-cases/order/create-order'

export const createOrder: CreateOrder = (saveOrder) => (order) => {
  return createOrderCore(saveOrder)(order)
}
