import { Module } from '@nestjs/common';
import { OrderProductsRepository } from './repositories/implementation/order-products.repository';
import { CreateOrderProductUseCase } from './use-cases/create-order-product/create-order-product.usecase';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports:[],
  controllers: [],
  providers: [OrderProductsRepository, CreateOrderProductUseCase, PrismaService],
  exports: [CreateOrderProductUseCase]
})
export class OrderProductsModule {}
