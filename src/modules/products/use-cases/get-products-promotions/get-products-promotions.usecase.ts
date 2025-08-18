import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@/modules/products/repositories/implementation/product.repository';

@Injectable()
export class GetProductsPromotionsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute() {
    return this.productRepository.getProductsPromotions();
  }
}
