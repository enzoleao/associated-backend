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
  ],
})
export class ProductsModule {}
