import { ICreateOrder } from '../interfaces/create-order.interface';

export interface IOrdersRepository {
  createOrder(order: ICreateOrder);
}
