import { Injectable } from '@nestjs/common';
import { Addon, Product } from '@prisma/client';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { IProductRepository } from '@/modules/products/repositories/product.repository';
import { PaginationQueryDto } from '@/common/dtos/pagination-query.dto';
import { IAddonsRepository } from '../addons.repository';

@Injectable()
export class AddonsRepository implements IAddonsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAddonsById(ids: string[]): Promise<Addon[]>{
    return this.prismaService.tenantQuery('addon', 'findMany', {
      where: {
        id: {
          in: ids
        }
      },
    })
  }
}
