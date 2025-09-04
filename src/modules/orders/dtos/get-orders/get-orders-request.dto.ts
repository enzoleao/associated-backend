import { PaginationQueryDto } from "@/common/dtos/pagination-query.dto";
import { Transform } from "class-transformer";
import { IsArray, IsOptional } from "class-validator";

export class GetOrdersParamsRequestDto extends PaginationQueryDto {
   @IsOptional()
  @IsArray()
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((v) => Number(v)) : [Number(value)],
    { toClassOnly: true },
  )
  order_status_id?: number[];
  
}