import { Module } from '@nestjs/common';
import { ProductsController } from '@/modules/products/controllers/products.controller';
import { MinioStorageService } from '@/modules/storage/services/minio-storage.service';
import {
  CreateProductUseCase,
  GetProductByIdUseCase,
  GetProductGroupedUsecase,
  GetProductsPromotionsUseCase,
  ProductFilesPresignUsecase,
} from '@/modules/products/use-cases';
import { ProductRepository } from '@/modules/products/repositories/implementation/product.repository';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { GetProductsByIdUseCase } from './use-cases/get-products-by-id/get-products-by-id.usecase';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductFilesPresignUsecase,
    MinioStorageService,
    CreateProductUseCase,
    ProductRepository,
    PrismaService,
    GetProductGroupedUsecase,
    GetProductsPromotionsUseCase,
    GetProductByIdUseCase,
    GetProductsByIdUseCase,
  ],
  exports: [GetProductsByIdUseCase]
})
export class ProductsModule {}
