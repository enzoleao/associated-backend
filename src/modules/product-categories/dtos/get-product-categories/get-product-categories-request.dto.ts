import { IsOptional, IsString } from "class-validator";

export class GetProductCategoriesRequestDto {
  @IsOptional()
  @IsString()
  search_term?: string;
  
}