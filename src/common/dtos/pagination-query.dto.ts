// common/types/pagination.dto.ts
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type, Transform } from 'class-transformer';

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
  @Transform(({ value }) => {
    if (!value) return {};
    // Se for string JSON, parse
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return {};
      }
    }
    return value;
  })
  filters?: Record<string, any>;
}
