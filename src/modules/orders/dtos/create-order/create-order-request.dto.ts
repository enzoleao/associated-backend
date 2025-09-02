import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OptionDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsInt()
  quantity: number;
}

export class AddonDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsInt()
  quantity: number;
}

export class ProductDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  client_note?: string;

  @ApiProperty({ type: [AddonDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => AddonDto)
  addons: AddonDto[];

  @ApiProperty({ type: [OptionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => AddonDto)
  options: OptionDto[];
}

export class CreateOrderRequestDto {
  @ApiProperty()
  @IsString()
  delivery_type: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address_id: string;

  @ApiProperty({ type: [ProductDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}
