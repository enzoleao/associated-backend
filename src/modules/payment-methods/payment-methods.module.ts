import { Module } from '@nestjs/common';
import { PaymentMethodsController } from './controllers/payment-methods.controller';
import { PaymentMethodsRepository } from './repositories/implementation/payment-methods.repository';
import { GetPaymentMethodsUseCase } from './use-cases';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsRepository, GetPaymentMethodsUseCase, PrismaService],
})
export class PaymentMethodsModule {}
