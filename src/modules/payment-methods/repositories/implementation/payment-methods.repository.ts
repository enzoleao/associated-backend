import { Injectable } from '@nestjs/common';
import { IPaymentMethodsRepository } from '../payment-methods.repository';
import { PaymentMethod } from '@prisma/client';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class PaymentMethodsRepository implements IPaymentMethodsRepository {
  constructor(
    private readonly prismaService: PrismaService
  ){}
  getPaymentMethods(): Promise<PaymentMethod[]> {
    return this.prismaService.paymentMethod.findMany()
  }
}
