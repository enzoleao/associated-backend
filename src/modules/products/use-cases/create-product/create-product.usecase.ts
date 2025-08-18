import { Injectable } from '@nestjs/common';
import { CreateProductRequestDto } from '@/modules/products/dtos';
import { ProductRepository } from '@/modules/products/repositories/implementation/product.repository';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    product_category_id,
    name,
    price,
    image_path,
  }: CreateProductRequestDto) {
    return this.productRepository.createProduct({
      product_category_id,
      name,
      price,
      image_path,
    });
  }
}
