import {
  CreateOrder,
  createOrder as createOrderCore,
} from '../use-cases/create-order'

export const createOrder: CreateOrder = (saveOrder) => (order) => {
  return createOrderCore(saveOrder)(order)
}
