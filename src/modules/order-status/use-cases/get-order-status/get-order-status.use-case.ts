import { Injectable } from '@nestjs/common';
import { OrderStatusRepository } from '../../repositories/implementation/order-status.repository';
import { GetOrderStatusRequestDto } from '../../dtos/order-status/order-status-request.dto';

@Injectable()
export class GetOrderStatusUseCase {
  constructor(
    private readonly orderStatusRepository: OrderStatusRepository
  ){}
  execute(query: GetOrderStatusRequestDto) {
    return this.orderStatusRepository.getOrderStatus(query)
  }
}
