import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderProductAddonsRepository } from './repositories/implementation/order-product-addons.repository';
import { CreateOrderProductAddonUseCase } from './use-cases/create-order-product-addons/create-order-product-addons.usecase';

@Module({
  imports:[],
  controllers: [],
  providers: [PrismaService, OrderProductAddonsRepository, CreateOrderProductAddonUseCase],
  exports: [CreateOrderProductAddonUseCase]
})
export class OrderProductAddonsModule {}
