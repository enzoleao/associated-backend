import { PrismaModel, PrismaService } from '@/modules/prisma/prisma.service';
import { PaginationQueryDto } from '@/common/dtos/pagination-query.dto';

interface PaginateOptions<T> {
  prisma: PrismaService;
  model: PrismaModel;
  args: PaginationQueryDto;
  searchFields?: string[];
  select?: Record<string, any>;
}

export async function paginate<T>({
  prisma,
  model,
  args,
  searchFields = [],
  select,
}: PaginateOptions<T>): Promise<{
  data: T[];
  meta: {
    page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
    next_page: number | null;
    previous_page: number | null;
  };
}> {
  const page = Number(args.page) || 1;
  const perPage = Number(args.per_page) || 10;
  const skip = (page - 1) * perPage;

  const where: Record<string, any> = {
    ...(args.filters || {}),
  };

  if (args.search_term && searchFields.length) {
    where.OR = searchFields.map((field) => {
      if (field.includes('.')) {
        const [relation, column] = field.split('.');
        return {
          [relation]: {
            [column]: {
              contains: args.search_term,
              mode: 'insensitive',
            },
          },
        };
      }
      return {
        [field]: {
          contains: args.search_term,
          mode: 'insensitive',
        },
      };
    });
  }

  const [data, totalItems] = await Promise.all([
    prisma.tenantQuery<T[]>(model, 'findMany', {
      where,
      skip,
      take: perPage,
      orderBy: args.order_by ?? { created_at: 'desc' },
      select,
    }),
    prisma.tenantQuery<number>(model, 'count', { where }),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data,
    meta: {
      page,
      per_page: perPage,
      total_items: totalItems,
      total_pages: totalPages,
      next_page: page < totalPages ? page + 1 : null,
      previous_page: page > 1 ? page - 1 : null,
    },
  };
}
