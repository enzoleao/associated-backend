import { Controller, Query } from '@nestjs/common';
import { GetProductCategoriesUseCase } from '../use-cases';
import { Endpoint } from '@/common/decorators/endpoint';
import { GetProductCategoriesRequestDto } from '../dtos/get-product-categories/get-product-categories-request.dto';

@Controller('product-categories')
export class ProductCategoriesController {
  constructor(
    private readonly getProductCategoriesUseCase: GetProductCategoriesUseCase
  ){}

  @Endpoint({
    method: 'GET',
    summary: 'Get Product Categories.',
    isProtectedRoute: false,
  })
  async getProductCategories(@Query() getProductCategoriesRequestDto: GetProductCategoriesRequestDto) {
    return this.getProductCategoriesUseCase.execute(getProductCategoriesRequestDto)
  }
}
