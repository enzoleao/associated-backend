import { Body, Controller, Param, Query } from '@nestjs/common';
import { Endpoint } from '@/common/decorators/endpoint';
import { CreateProductRequestDto } from '@/modules/products/dtos';
import {
  CreateProductUseCase,
  GetProductByIdUseCase,
  GetProductGroupedUsecase,
  GetProductsPromotionsUseCase,
  ProductFilesPresignUsecase,
} from '@/modules/products/use-cases';
import { PaginationQueryDto } from '@/common/dtos/pagination-query.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productFilesPresignUseCase: ProductFilesPresignUsecase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductGroupedUsecase: GetProductGroupedUsecase,
    private readonly getProductsPromotionsUseCase: GetProductsPromotionsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
  ) {}

  @Endpoint({
    method: 'POST',
    summary: 'Create Product.',
    isProtectedRoute: true,
  })
  async createProduct(@Body() createProductDto: CreateProductRequestDto) {
    return {
      message: 'Product created successfully.',
      data: await this.createProductUseCase.execute(createProductDto),
    };
  }

  @Endpoint({
    method: 'GET',
    route: '/grouped',
    summary: 'Get Product Grouped By Categories.',
  })
  async getProductsGrouped(@Query() query: PaginationQueryDto) {
    return this.getProductGroupedUsecase.execute(query);
  }

  @Endpoint({
    method: 'GET',
    route: '/promotions',
    summary: 'Get Products With Promotions.',
  })
  async getProductsPromotion() {
    return this.getProductsPromotionsUseCase.execute();
  }

  @Endpoint({
    method: 'GET',
    route: 'files-presign',
    summary: 'Product File Presign.',
    isProtectedRoute: true,
  })
  productFilesPresign(
    @Query('file_name') fileName: string,
    @Query('content_type') contentType: string,
  ) {
    return this.productFilesPresignUseCase.execute({ contentType, fileName });
  }

  @Endpoint({
    method: 'GET',
    route: ':id',
    summary: 'Get Product By Id.',
  })
  async getProductById(@Param('id') productId: string) {
    return {
      message: 'Request successfully.',
      data: await this.getProductByIdUseCase.execute(productId),
    };
  }
}
