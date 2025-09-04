import { Controller, Query } from '@nestjs/common';
import { GetOrderStatusUseCase } from '../use-cases';
import { Endpoint } from '@/common/decorators/endpoint';
import { GetOrderStatusRequestDto } from '../dtos/order-status/order-status-request.dto';

@Controller('order-status')
export class OrderStatusController {
  constructor(
    private readonly getOrderStatusUseCase: GetOrderStatusUseCase
  ){}

  @Endpoint({
      method: 'GET',
      summary: 'Get Order Status.',
      isProtectedRoute: true,
    })
    async getOrders(@Query() getOrderStatusRequestDto: GetOrderStatusRequestDto) {
      return this.getOrderStatusUseCase.execute(getOrderStatusRequestDto)
    }
}
