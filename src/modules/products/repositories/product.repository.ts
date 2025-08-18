import { Product } from '@prisma/client';
import { PaginationQueryDto } from '@/common/dtos/pagination-query.dto';

export interface IProductRepository {
  createProduct(product: Partial<Product>): Promise<Product>;

  getProductGrouped(query: PaginationQueryDto);

  getProductsPromotions();

  getProductById(id: string);
}
