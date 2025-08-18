import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@/modules/products/repositories/implementation/product.repository';
import { PaginationQueryDto } from '@/common/dtos/pagination-query.dto';

@Injectable()
export class GetProductGroupedUsecase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: PaginationQueryDto) {
    return this.productRepository.getProductGrouped(query);
  }
}
