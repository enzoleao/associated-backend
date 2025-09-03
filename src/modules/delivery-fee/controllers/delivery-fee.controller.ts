import { Endpoint } from '@/common/decorators/endpoint';
import { formatResponse } from '@/common/helpers/format-response';
import { Controller, Param } from '@nestjs/common';
import { CalculateDeliveryFeeUseCase } from '../use-cases';

@Controller('delivery-fee')
export class DeliveryFeeController {
    constructor(
        private readonly calculateDeliveryFeeUseCase: CalculateDeliveryFeeUseCase
      ){}
    
      private formatResponseWithMessage<T>(message: string, data: T) {
        return formatResponse(message, data);
      }

    @Endpoint({
        method: 'GET',
        summary: 'GET Delivery Fee Price.',
        route: ':id',
        isProtectedRoute: true,
      })
      async calculateDeliveryFee(@Param('id') addressId: string) {
        return this.calculateDeliveryFeeUseCase.execute(addressId);
      }
    
}
