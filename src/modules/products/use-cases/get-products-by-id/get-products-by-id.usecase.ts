import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@/modules/products/repositories/implementation/product.repository';
import { Product, Promotion } from '@prisma/client';


@Injectable()
export class GetProductsByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string[]): Promise<(Product & { promotion: Promotion | null })[]> {
    return this.productRepository.getProductsById(id);
  }
}
