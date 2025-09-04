import { Injectable } from '@nestjs/common';
import { IProductCategoriesRepository } from '../product-categories.repository';
import { ProductCategory } from '@prisma/client';
import { GetProductCategoriesRequestDto } from '../../dtos/get-product-categories/get-product-categories-request.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class ProductCategoriesRepository implements IProductCategoriesRepository {
  constructor(
    private readonly prismaService: PrismaService
  ){}
  getProductCategories(query: GetProductCategoriesRequestDto): Promise<ProductCategory[]> {
  return this.prismaService.productCategory.findMany({
    where: {
      name: {
        contains: query.search_term,
        mode: 'insensitive',
      },
    },
  })
}
}
