import { IsOptional, IsString } from "class-validator";

export class GetOrderStatusRequestDto {
  @IsOptional()
  @IsString()
  search_term?: string;
  
}