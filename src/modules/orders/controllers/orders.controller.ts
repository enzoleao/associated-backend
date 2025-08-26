import { Body, Controller } from '@nestjs/common';
import { Endpoint } from '@/common/decorators/endpoint';
import { formatResponse } from '@/common/helpers/format-response';
import { CreateOrderRequestDto } from '../dtos/create-order/create-order-request.dto';
import { CreateOrderUseCase } from '../use-cases/create-order/create-order.usecase';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase
  ){}

  private formatResponseWithMessage<T>(message: string, data: T) {
    return formatResponse(message, data);
  }
  @Endpoint({
    method: 'POST',
    summary: 'Create Order.',
    isProtectedRoute: false,
  })
  async createUser(@Body() createUserRequestDto: CreateOrderRequestDto) {
    return this.createOrderUseCase.execute(createUserRequestDto)
  }
}
