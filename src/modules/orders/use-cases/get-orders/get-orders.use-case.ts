import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../../repositories/implementation/orders.repository';
import { PaginationQueryDto } from '@/common/dtos/pagination-query.dto';
import { GetOrdersParamsRequestDto } from '../../dtos/get-orders/get-orders-request.dto';

@Injectable()
export class GetOrdersUseCase {
  constructor(
    private readonly ordersRepository: OrdersRepository
  ){}
  execute(paginationQueryDto: GetOrdersParamsRequestDto) {
    return this.ordersRepository.getOrders(paginationQueryDto)
  }
}
