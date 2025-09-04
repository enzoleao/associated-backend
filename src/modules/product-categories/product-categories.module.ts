import { Module } from '@nestjs/common';
import { ProductCategoriesController } from './controllers/product-categories.controller';
import { ProductCategoriesRepository } from './repositories/implementation/product-categories.repository';
import { GetProductCategoriesUseCase } from './use-cases';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ProductCategoriesController],
  providers: [ProductCategoriesRepository, GetProductCategoriesUseCase, PrismaService],
})
export class ProductCategoriesModule {}
