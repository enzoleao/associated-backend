import { Module } from '@nestjs/common';
import { OrderStatusController } from './controllers/order-status.controller';
import { OrderStatusRepository } from './repositories/implementation/order-status.repository';
import { GetOrderStatusUseCase } from './use-cases';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [OrderStatusController],
  providers: [OrderStatusRepository, GetOrderStatusUseCase, PrismaService],
})
export class OrderStatusModule {}
