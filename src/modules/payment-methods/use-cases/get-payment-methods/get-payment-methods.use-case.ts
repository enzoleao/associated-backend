import { Injectable } from '@nestjs/common';
import { PaymentMethodsRepository } from '../../repositories/implementation/payment-methods.repository';

@Injectable()
export class GetPaymentMethodsUseCase {
  constructor(
    private readonly paymentMethodsRepository: PaymentMethodsRepository
  ){}
  execute() {
    return this.paymentMethodsRepository.getPaymentMethods()
  }
}
