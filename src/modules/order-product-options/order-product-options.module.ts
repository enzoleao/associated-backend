import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderProductOptionUseCase } from './use-cases/create-order-product-options/create-order-product-options.usecase';
import { OrderProductOptionsRepository } from './repositories/implementation/order.product-options.repository';

@Module({
  imports:[],
  controllers: [],
  providers: [PrismaService, OrderProductOptionsRepository, CreateOrderProductOptionUseCase],
  exports: [CreateOrderProductOptionUseCase]
})
export class OrderProductOptionsModule {}
