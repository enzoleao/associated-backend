import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@/modules/products/repositories/implementation/product.repository';

@Injectable()
export class GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string) {
    return this.productRepository.getProductById(id);
  }
}
