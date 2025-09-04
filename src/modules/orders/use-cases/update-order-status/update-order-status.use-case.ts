import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../../repositories/implementation/orders.repository';
import { IUpdateOrderStatus } from '../../interfaces/update-order-status.interface';

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(
    private readonly ordersRepository: OrdersRepository
  ){}
  execute({id, order_status_id}: IUpdateOrderStatus) {
    return this.ordersRepository.updateOrderStatusId({id, order_status_id})
  }
}
