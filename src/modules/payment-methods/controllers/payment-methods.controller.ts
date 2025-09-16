import { Controller } from '@nestjs/common';
import { GetPaymentMethodsUseCase } from '../use-cases';
import { Endpoint } from '@/common/decorators/endpoint';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(
    private readonly getPaymentMethodsUseCase: GetPaymentMethodsUseCase
  ){}

  @Endpoint({
    method: 'GET',
    summary: 'Get Payment Methods.',
    isProtectedRoute: true
  })
    getPaymentMethods() {
    return this.getPaymentMethodsUseCase.execute()
  }

}
