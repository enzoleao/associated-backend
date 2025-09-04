import { Body, Controller, Param, Query } from '@nestjs/common';
import { Endpoint } from '@/common/decorators/endpoint';
import { formatResponse } from '@/common/helpers/format-response';
import { CreateOrderRequestDto } from '../dtos/create-order/create-order-request.dto';
import { CreateOrderUseCase } from '../use-cases/create-order/create-order.usecase';
import { PaginationQueryDto } from '@/common/dtos/pagination-query.dto';
import { GetOrdersUseCase } from '../use-cases';
import { GetOrdersParamsRequestDto } from '../dtos/get-orders/get-orders-request.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrdersUseCase: GetOrdersUseCase
  ){}

  private formatResponseWithMessage<T>(message: string, data: T) {
    return formatResponse(message, data);
  }
  @Endpoint({
    method: 'GET',
    summary: 'Get Orders.',
    isProtectedRoute: true,
  })
  async getOrders(@Query() paginationQueryDto: GetOrdersParamsRequestDto) {
    return this.getOrdersUseCase.execute(paginationQueryDto)
  }
  
  @Endpoint({
    method: 'POST',
    summary: 'Create Order.',
    isProtectedRoute: true,
  })
  async createOrder(@Body() createUserRequestDto: CreateOrderRequestDto) {
    return this.createOrderUseCase.execute(createUserRequestDto)
  }
}
