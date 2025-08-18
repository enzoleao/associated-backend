// common/types/pagination.dto.ts
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  per_page?: number = 10;

  @IsOptional()
  @IsString()
  search_term?: string;

  @IsOptional()
  order_by?: Record<string, 'asc' | 'desc'>;

  @IsOptional()
  filters?: Record<string, any>;
}
