import { PaginationQueryDto } from "@/common/dtos/pagination-query.dto";
import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";

export class GetAssociatesRequestParams extends PaginationQueryDto {

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === "string") {
      return Number(value);
    }
    return Number(value);
  })
  associate_status_id?: number;
}
