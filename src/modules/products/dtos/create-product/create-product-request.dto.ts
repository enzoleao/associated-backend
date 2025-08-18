import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductRequestDto {
  @ApiProperty()
  @IsNumber()
  product_category_id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image_path: string;
}
