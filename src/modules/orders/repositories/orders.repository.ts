import { Orders } from '@prisma/client';
import { ICreateOrder } from '../interfaces/create-order.interface';
import { PaginationQueryDto } from '@/common/dtos/pagination-query.dto';
import { GetOrdersParamsRequestDto } from '../dtos/get-orders/get-orders-request.dto';
import { IUpdateOrderStatus } from '../interfaces/update-order-status.interface';

export interface IOrdersRepository {
  getOrders(paginationQueryDto: GetOrdersParamsRequestDto):Promise<Partial<Orders>>

  createOrder(order: ICreateOrder): Promise<Orders>;

  updateOrderStatusId(orderData: IUpdateOrderStatus):Promise<Partial<Orders>>
}
