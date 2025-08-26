import { Addon, Product } from '@prisma/client';
import { PaginationQueryDto } from '@/common/dtos/pagination-query.dto';

export interface IAddonsRepository {
  getAddonsById(id: string[]): Promise<Addon[]>;
}
