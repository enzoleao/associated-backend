import { Injectable } from '@nestjs/common';
import { ProductCategoriesRepository } from '../../repositories/implementation/product-categories.repository';
import { GetProductCategoriesRequestDto } from '../../dtos/get-product-categories/get-product-categories-request.dto';

@Injectable()
export class GetProductCategoriesUseCase {
  constructor(
    private readonly productCategoriesRepository: ProductCategoriesRepository
  ){}
  execute(query: GetProductCategoriesRequestDto) {
    return this.productCategoriesRepository.getProductCategories(query)
  }
}
