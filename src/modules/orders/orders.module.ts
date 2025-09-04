import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { ProductsModule } from '../products/products.module';
import { PrismaService } from '../prisma/prisma.service';
import { AddonsModule } from '../addons/addons.module';
import { OrdersRepository } from './repositories/implementation/orders.repository';
import { OrderProductsModule } from '../order-products/order-products.module';
import { OrderProductAddonsModule } from '../order-product-addons/order-product-addons.module';
import { OrderProductOptionsModule } from '../order-product-options/order-product-options.module';
import { OrderSummaryCalculatorService } from './services/order-summary-calculator/order-summary-calculator.service';
import { OrderProductCreatorService } from './services/order-product-creator/order-product-creator.service';
import { CreateOrderUseCase, GetOrdersUseCase } from './use-cases';
import { DeliveryFeeModule } from '../delivery-fee/delivery-fee.module';

@Module({
  imports:[ProductsModule, AddonsModule, OrderProductsModule, OrderProductAddonsModule, OrderProductOptionsModule, DeliveryFeeModule],
  controllers: [OrdersController],
  providers: [CreateOrderUseCase, PrismaService, OrdersRepository, OrderSummaryCalculatorService, OrderProductCreatorService, GetOrdersUseCase],
})
export class OrdersModule {}
