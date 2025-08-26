import { Injectable } from '@nestjs/common';
import { Product, Promotion } from '@prisma/client';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { IProductRepository } from '@/modules/products/repositories/product.repository';
import { PaginationQueryDto } from '@/common/dtos/pagination-query.dto';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(product: Partial<Product>): Promise<Product> {
    return this.prismaService.tenantAndAuditoryQuery('product', 'create', {
      data: {
        ...product,
      },
    });
  }

  async getProductGrouped(query: PaginationQueryDto) {
    return this.prismaService.productCategory.findMany({
      select: {
        id: true,
        name: true,
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            image_path: true,
            promotion: {
              select: {
                id: true,
                discount_type: true,
                value: true,
              },
            },
            created_at: true,
            updated_at: true,
          },
        },
      },
      where: {
        products: {
          some: {},
        },
      },
    });
  }

  async getProductsPromotions() {
    return this.prismaService.tenantQuery('product', 'findMany', {
      select: {
        id: true,
        name: true,
        price: true,
        image_path: true,
        promotion: {
          select: {
            id: true,
            discount_type: true,
            value: true,
          },
        },
      },
      where: {
        promotion_id: {
          not: null,
        },
      },
    });
  }

  async getProductById(id: string) {
    return this.prismaService.tenantQuery('product', 'findUnique', {
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image_path: true,
        promotion: {
          select: {
            id: true,
            discount_type: true,
            value: true,
          },
        },
        addon: {
          select: {
            addon: {
              select: {
                id: true,
                name: true,
                price: true,
                image_path: true,
              },
            },
          },
        },
      },
      where: {
        id,
      },
    });
  }

  async getProductsById(ids: string[]): Promise<(Product & { promotion: Promotion | null })[]>
{
    return this.prismaService.tenantQuery('product', 'findMany', {
      where: {
        id: {
          in: ids
        }
      },
      include: {
        promotion: true
      }
    })
  }
}
